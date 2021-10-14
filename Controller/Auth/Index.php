<?php

namespace Snapfinance\Payment\Controller\Auth;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Framework\App\ResponseInterface;
use Magento\Framework\Exception\LocalizedException;


class Index extends Action
{

    protected $curlClient;  

    public function __construct(
        Context $context,
        \Magento\Framework\HTTP\Client\Curl $curl,
        \Snapfinance\Payment\Helper\Data $data,
        \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory
    ) {
        $this->curlClient = $curl;
        $this->helper = $data;
        $this->resultJsonFactory = $resultJsonFactory;
        parent::__construct($context);
    }

    public function execute()
    {
        $resultJson = $this->resultJsonFactory->create();
        try {
            $url = $this->helper->getAPIHost();
            $data =array('client_id'=>$this->helper->GetClientID(),
                        'client_secret'=>$this->helper->GetClientSecret(),
                        'audience'=>$this->helper->getAPIAudiance(),
                        'grant_type'=>'client_credentials');
            $params = json_encode($data);
            //print_r($params);die;
            $this->curlClient->addHeader("Content-Type", "application/json");
            $this->curlClient->addHeader("Content-Length", strlen($params));
            $this->curlClient->post($url, $params);
            $response = $this->curlClient->getBody();
           // print_r($response);die;
            return $resultJson->setData($response);
        } catch (LocalizedException $e) {
            $this->messageManager->addExceptionMessage(
                $e,
                $e->getMessage()
            );
            $data =array('status'=>400,
            'access_token'=>'',
            'message'=> $e->getMessage());
            return $resultJson->setData($data);
        }

    }
}
