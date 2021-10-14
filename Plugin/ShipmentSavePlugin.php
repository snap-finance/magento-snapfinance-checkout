<?php

namespace Snapfinance\Payment\Plugin;

use Snapfinance\Payment\Helper\Data;

class ShipmentSavePlugin {

    protected $resultRedirectFactory;
    protected $messageManager;

    const LOGGER_DIR_NAME = 'snap_order';

    public function __construct(
            \Magento\Framework\Controller\Result\RedirectFactory $resultRedirectFactory,
            \Magento\Framework\Message\ManagerInterface $ManagerInterface,
            \Snapfinance\Payment\Helper\Data $data,
            \Magento\Framework\HTTP\Client\Curl $curl,
            \Magento\Sales\Api\Data\TransactionSearchResultInterfaceFactory $transactions,
            \Magento\Framework\HTTP\Adapter\CurlFactory $curlFactory,
            \Magento\Framework\Json\Helper\Data $jsonHelper,
            \Snapfinance\Payment\Logger\Logger $logger,
            \Snapfinance\Payment\Logger\Handler $handler
    ) {
        $this->resultRedirectFactory = $resultRedirectFactory;
        $this->messageManager = $ManagerInterface;
        $this->curlClient = $curl;
        $this->helper = $data;
        $this->transactions = $transactions;
        $this->curlFactory = $curlFactory;
        $this->jsonHelper = $jsonHelper;
        $this->_logger = $logger;
        $handler->seturl(self::LOGGER_DIR_NAME); //Set the Directory name for logger
    }

    public function aroundExecute(\Magento\Shipping\Controller\Adminhtml\Order\Shipment\Save $subject, callable $proceed) {
        $resultRedirect = $this->resultRedirectFactory->create();
        $data_delivery_date = $subject->getRequest()->getParam('delivery_date');

        try {
            if ($data_delivery_date == "") {
                $this->messageManager->addError(__("Expected delivery date cannot be blank."));
                //Return the blank message
                return $resultRedirect->setPath('*/*/new', ['order_id' => $subject->getRequest()->getParam('order_id')]);
            } elseif ($data_delivery_date != "" && $data_delivery_date != "0000-00-00") {

                //Get the order id from param value
                $order_id = $subject->getRequest()->getParam('order_id');

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

                $params_body = "";
                $delivery_date_ymd = "";

                if ($data_delivery_date != "" && $data_delivery_date != '0000-00-00') {
                    $delivery_date_ymd = date("Y-m-d", strtotime($data_delivery_date));
                    $data_body = array('deliveryDate' => $delivery_date_ymd);
                    $params_body = json_encode($data_body);
                }
                //get the transaction ID..
                $transactions = $this->transactions->create()->addOrderIdFilter($order_id)->getFirstItem();
                $transactionId = $transactions->getData('txn_id');

                //call the capture curl end point function
                $response = $this->helper->setCaptureCurlendpoint($transactionId, $params_body, $response_body['access_token']);

                if (!$response['success']) {
                    $this->messageManager->addError($response['error'][0]['message']);
                    return $resultRedirect->setPath('*/*/new', ['order_id' => $order_id]);
                } else {
                    return $proceed();
                }
            } else {
                return $proceed();
            }
        } catch (\Exception $e) {
            $this->_logger->critical('Error - Shipment Save Validation ::' . $e->getMessage());
        }
    }

}
