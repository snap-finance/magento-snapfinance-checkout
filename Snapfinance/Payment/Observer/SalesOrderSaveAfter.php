<?php

namespace Snapfinance\Payment\Observer;

use Magento\Sales\Api\OrderRepositoryInterface;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Controller\Result\RedirectFactory;
use Snapfinance\Payment\Helper\Data;


class SalesOrderSaveAfter implements ObserverInterface
{

    protected $orderRepository;

    public function __construct(
        OrderRepositoryInterface $orderRepository,
        \Magento\Framework\HTTP\Client\Curl $curl,
        \Snapfinance\Payment\Helper\Data $data,
        \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory,
        \Magento\Sales\Api\Data\TransactionSearchResultInterfaceFactory $transactions,
        \Psr\Log\LoggerInterface $logger
    ) {
        $this->orderRepository = $orderRepository;
        $this->curlClient = $curl;
        $this->helper = $data;
        $this->resultJsonFactory = $resultJsonFactory;
        $this->transactions = $transactions;
        $this->_logger = $logger;
    }

    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        $order = $observer->getEvent()->getOrder();
        $order_id = $order->getId();
        $payment = $order->getPayment();
        $method = $payment->getMethodInstance();
        $methodCode = $method->getCode();    
        if($order->getState() == "complete" && $methodCode == "snap_payment")
        {
            $order_id = $order->getId();

            $url = $this->helper->getAPIHost();
            $data =array('client_id'=>$this->helper->GetClientID(),
                        'client_secret'=>$this->helper->GetClientSecret(),
                        'audience'=>$this->helper->getAPIAudiance(),
                        'grant_type'=>'client_credentials');
            $params = json_encode($data);
        
            $this->curlClient->addHeader("Content-Type", "application/json");
            $this->curlClient->addHeader("Content-Length", strlen($params));
            $this->curlClient->post($url, $params);
            $response = json_decode($this->curlClient->getBody(),true);                   
            
            $transactions = $this->transactions->create()->addOrderIdFilter($order_id)->getFirstItem();
            $transactionId = $transactions->getData('txn_id');
            $resultJson = $this->resultJsonFactory->create();
            try {
            
                $url = $this->helper->getcompleteOrderAPI().$transactionId;
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_FAILONERROR,1);
                curl_setopt($ch, CURLOPT_HEADER,1);
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_TIMEOUT, 180);
            	curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
                $header[] = 'Content-Type: application/json';
                $header[] = "Authorization: Bearer ".$response['access_token'];
                curl_setopt($ch, CURLOPT_HTTPHEADER,$header);
                $retValue = curl_exec($ch);
                $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                $error_msg = curl_error($ch);
               
                $this->_logger->info('Snap_log', array($retValue));
                $this->_logger->info('Snap_log', array($error_msg));
                curl_close($ch);
            } catch (LocalizedException $e) {
               $this->_logger->critical($e->getMessage());
            }

        }
        return $this;
    }
}