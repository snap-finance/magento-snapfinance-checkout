<?php

namespace Snapfinance\Payment\Controller\Adminhtml\Updatedeliverydate;

use Magento\Sales\Api\OrderRepositoryInterface;
use Snapfinance\Payment\Helper\Data;

class Index extends \Magento\Backend\App\Action {

    protected $resultJsonFactory;
    protected $quoteFactory;
    protected $orderRepository;
    protected $_logger;
    protected $curlFactory;

    const LOGGER_DIR_NAME = 'snap_order';

    public function __construct(
            \Magento\Backend\App\Action\Context $context,
            \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory,
            \Magento\Quote\Model\QuoteFactory $quoteFactory,
            OrderRepositoryInterface $orderRepository,
            \Magento\Sales\Model\ResourceModel\Order $orderResourceModel,
            \Snapfinance\Payment\Logger\Logger $logger,
            \Snapfinance\Payment\Logger\Handler $handler,
            \Snapfinance\Payment\Helper\Data $data,
            \Magento\Framework\HTTP\Client\Curl $curl,
            \Magento\Sales\Api\Data\TransactionSearchResultInterfaceFactory $transactions,
            \Magento\Framework\HTTP\Adapter\CurlFactory $curlFactory,
            \Magento\Framework\Json\Helper\Data $jsonHelper
    ) {
        $this->resultJsonFactory = $resultJsonFactory;
        $this->quoteFactory = $quoteFactory;
        $this->orderRepository = $orderRepository;
        $this->orderResourceModel = $orderResourceModel;
        $this->_logger = $logger;
        $this->helper = $data;
        $this->curlClient = $curl;
        $this->transactions = $transactions;
        $this->jsonHelper = $jsonHelper;
        $this->curlFactory = $curlFactory;
        $handler->seturl(self::LOGGER_DIR_NAME); //Set the Directory name for logger

        parent::__construct($context);
    }

    public function execute() {

        $ajaxJsonResponse = $this->resultJsonFactory->create();

        try {
            $order_id = $this->getRequest()->getParam('order_id');
            $delivery_date = $this->getRequest()->getParam('delivery_date');
            $ajax_response['data'] = array();

            //Need to update the delivery date in the database and called the API end point
            if ($delivery_date != '' && $delivery_date != '0000-00-00') {

                // Save the delivery date in the quote table and sales order table
                $order = $this->orderRepository->get($order_id);
                $delivery_date_ymd = date("Y-m-d", strtotime($delivery_date));

                //compare the delivery date is same or not.
                if (strtotime($order->getDeliveryDate()) != strtotime($delivery_date_ymd)) {

                    //Called the capture API end point to update the delivery date at snap side.
                    $url = $this->helper->getAPIHost();
                    $data = array('client_id' => $this->helper->GetClientID(),
                        'client_secret' => $this->helper->GetClientSecret(),
                        'audience' => $this->helper->getAPIAudiance(),
                        'grant_type' => 'client_credentials'
                    );
                    $params = json_encode($data);

                    $this->curlClient->addHeader("Content-Type", "application/json");
                    $this->curlClient->addHeader("Content-Length", strlen($params));
                    $this->curlClient->post($url, $params);
                    $response_body = json_decode($this->curlClient->getBody(), true);

                    $data_body = array('deliveryDate' => $delivery_date_ymd);
                    $params_body = json_encode($data_body);

                    //get the transaction ID..
                    $transactions = $this->transactions->create()->addOrderIdFilter($order_id)->getFirstItem();
                    $transactionId = $transactions->getData('txn_id');

                    //call the capture curl end point function
                    $response = $this->helper->setCaptureCurlendpoint($transactionId, $params_body, $response_body['access_token']);

                    if (!$response['success']) {
                        $ajax_response['data']['status'] = 0;
                        $ajax_response['data']['msg'] = $response['error'][0]['message'];
                    } else {
                        // success then update the date in database
                        $order->setDeliveryDate($delivery_date_ymd);
                        $this->orderResourceModel->save($order);

                        //Save the date in the quote table..
                        $quote = $this->quoteFactory->create()->load($order->getQuoteId());
                        $this->addDates($quote, $delivery_date_ymd);

                        $ajax_response['data']['status'] = 1;
                        $ajax_response['data']['msg'] = "Successfully updated delivery date";
                    }
                } else {
                    $ajax_response['data']['status'] = 0;
                    $ajax_response['data']['msg'] = "Already set this delivery date";
                }
            } else {
                $ajax_response['data']['status'] = 0;
                $ajax_response['data']['msg'] = "Expected delivery date cannot be blank.";
            }

            return $ajaxJsonResponse->setData($ajax_response);
        } catch (\Exception $e) {
            $this->_logger->critical('Error Updating Dates::' . $e->getMessage());
        }
    }

    /**
     * Set delivery dates in quote
     */
    private function addDates($quote, $delivery_date = null) {
        try {
            $quote->setData('delivery_date', $delivery_date);
            $quote->save();
            return true;
        } catch (\Exception $e) {
            $this->_logger->critical('Error Updating Dates in quote table:: ' . $e->getMessage());
        }
    }

}
