<?php

namespace Snapfinance\Payment\Observer;

use Magento\Sales\Api\OrderRepositoryInterface;
use Magento\Framework\Event\ObserverInterface;
use Snapfinance\Payment\Helper\Data;

class SalesOrderSaveAfter implements ObserverInterface {

    protected $orderRepository;
    protected $quoteFactory;
    protected $_request;
    protected $_logger;

    const LOGGER_DIR_NAME = 'snap_order';

    public function __construct(
            OrderRepositoryInterface $orderRepository,
            \Magento\Framework\HTTP\Client\Curl $curl,
            \Snapfinance\Payment\Helper\Data $data,
            \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory,
            \Magento\Sales\Api\Data\TransactionSearchResultInterfaceFactory $transactions,
            \Magento\Quote\Model\QuoteFactory $quoteFactory,
            \Magento\Framework\App\RequestInterface $request,
            \Snapfinance\Payment\Logger\Logger $logger,
            \Snapfinance\Payment\Logger\Handler $handler,
            \Magento\Framework\HTTP\Adapter\CurlFactory $curlFactory,
            \Magento\Framework\Json\Helper\Data $jsonHelper
    ) {
        $this->orderRepository = $orderRepository;
        $this->curlClient = $curl;
        $this->helper = $data;
        $this->resultJsonFactory = $resultJsonFactory;
        $this->transactions = $transactions;
        $this->_logger = $logger;
        $this->quoteFactory = $quoteFactory;
        $this->_request = $request;
        $this->curlFactory = $curlFactory;
        $this->jsonHelper = $jsonHelper;
        $handler->seturl(self::LOGGER_DIR_NAME); //Set the Directory name for logger
    }

    public function execute(\Magento\Framework\Event\Observer $observer) {
        $order = $observer->getEvent()->getOrder();
        $order_id = $order->getId();
        $payment = $order->getPayment();
        $method = $payment->getMethodInstance();
        $methodCode = $method->getCode();
        //Get the post param data
        $post_data = $this->_request->getParams();

        if ($order->getState() == "complete" && $methodCode == "snap_payment") {
            $order_id = $order->getId();
            $delivery_date_ymd = "";
            if (isset($post_data['delivery_date']) && $post_data['delivery_date'] != '') {
                $delivery_date_ymd = date("Y-m-d", strtotime($post_data['delivery_date']));
                //Set the delivery date in Quote
                $quote = $this->quoteFactory->create()->load($order->getQuoteId());
                $this->addDates($quote, $delivery_date_ymd);

                //Set the delivery date in the sales_order table
                $order->setData('delivery_date', $delivery_date_ymd);
                $order->save();
            }


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

            $transactions = $this->transactions->create()->addOrderIdFilter($order_id)->getFirstItem();
            $transactionId = $transactions->getData('txn_id');
            $resultJson = $this->resultJsonFactory->create();
            try {

                $params_body = "";
                if ($delivery_date_ymd != "") {
                    $data_body = array('deliveryDate' => $delivery_date_ymd);
                    $params_body = json_encode($data_body);
                }

                //call the capture curl end point function
                $response = $this->helper->setCaptureCurlendpoint($transactionId, $params_body, $response_body['access_token']);

                if (!$response['success']) {
                    //write the error message in the log file
                    $this->_logger->info('Failed - Snap_log::' . json_encode($response));
                } else {
                    $this->_logger->info('Success - Snap_log::' . json_encode($response));
                }
            } catch (LocalizedException $e) {
                $this->_logger->critical($e->getMessage());
            }
        }
        return $this;
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
            $this->_logger->critical('Error Saving Dates:: ' . $e->getMessage());
        }
    }

}
