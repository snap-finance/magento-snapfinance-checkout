<?php

namespace Snapfinance\Payment\Helper;

use Magento\Framework\App\Helper\Context;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;
use Snapfinance\Payment\Model\Ui\ConfigProvider;

class Data extends \Magento\Framework\App\Helper\AbstractHelper {

    const Code = 'snap';
    const API_STAGE_HOST = "https://auth-sandbox.snapfinance.com";
    const API_LIVE_HOST = "https://auth.snapfinance.com";
    const AUDIANCE_STAGE = "https://api-sandbox.snapfinance.com/platform/v1";
    const AUDIANCE_LIVE = "https://api.snapfinance.com/platform/v1";
    const KEY_CLIENTKEY_SANDBOX = 'payment/snap_payment/client_id';
    const KEY_CLIENT_SECRET_SANDBOX = 'payment/snap_payment/client_secret';
    const KEY_CLIENTKEY_PRODUCTION = 'payment/snap_payment/client_id_production';
    const KEY_CLIENT_SECRET_PRODUCTION = 'payment/snap_payment/client_secret_production';
    const LOGO_STAGE = 'https://snap-assets.snapfinance.com';
    const LOGO_LIVE = 'https://snap-assets.snapfinance.com';
    const API_STAGE_COMPLETE_ORDER = "https://api-sandbox.snapfinance.com/platform/v1/application/";
    const API_LIVE_COMPLETE_ORDER = "https://api.snapfinance.com/platform/v1/application/";

    protected $curlFactory;

    public function __construct(
            Context $context,
            \Magento\Framework\HTTP\Adapter\CurlFactory $curlFactory,
            \Magento\Framework\Json\Helper\Data $jsonHelper
    ) {

        $this->curlFactory = $curlFactory;
        $this->jsonHelper = $jsonHelper;
        parent::__construct($context);
    }

    public function isModuleEnable() {
        return $this->scopeConfig->getValue('payment/snap_payment/active', ScopeInterface::SCOPE_WEBSITE);
    }

    public function GetClientID() {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ?
                $this->scopeConfig->getValue(self::KEY_CLIENTKEY_PRODUCTION, ScopeInterface::SCOPE_WEBSITE) : $this->scopeConfig->getValue(self::KEY_CLIENTKEY_SANDBOX, ScopeInterface::SCOPE_WEBSITE);
    }

    public function GetClientSecret() {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ?
                $this->scopeConfig->getValue(
                        self::KEY_CLIENT_SECRET_PRODUCTION,
                        ScopeInterface::SCOPE_WEBSITE
                ) : $this->scopeConfig->getValue(
                        self::KEY_CLIENT_SECRET_SANDBOX,
                        ScopeInterface::SCOPE_WEBSITE
        );
    }

    public function getAPIHost() {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ?
                sprintf("%s/oauth/token", self::API_LIVE_HOST) : sprintf("%s/oauth/token", self::API_STAGE_HOST);
    }

    public function getAPIAudiance() {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ?
                sprintf("%s", self::AUDIANCE_LIVE) : sprintf("%s", self::AUDIANCE_STAGE);
    }

    public function getcompleteOrderAPI() {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ? sprintf(self::API_LIVE_COMPLETE_ORDER) : sprintf(self::API_STAGE_COMPLETE_ORDER);
    }

    public function IsrequiredbillingAddress() {
        return true;
        //return $this->scopeConfig->getValue('payment/snap_payment/requireBillingAddress',  ScopeInterface::SCOPE_WEBSITE);
    }

    public function getButtonStyle($code) {
        return $this->scopeConfig->getValue('payment/snap_payment/' . $code, ScopeInterface::SCOPE_WEBSITE);
    }

    public function GetMode() {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ? true : false;
    }

    public function getCheckoutLogo() {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ?
                $this->scopeConfig->getValue(
                        'payment/snap_payment/checkout_logo_production',
                        ScopeInterface::SCOPE_WEBSITE
                ) :
                $this->scopeConfig->getValue(
                        'payment/snap_payment/checkout_logo',
                        ScopeInterface::SCOPE_WEBSITE
        );
    }

    public function getCheckoutButton() {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ?
                $this->scopeConfig->getValue(
                        'payment/snap_payment/checkout_button_production',
                        ScopeInterface::SCOPE_WEBSITE
                ) :
                $this->scopeConfig->getValue(
                        'payment/snap_payment/checkout_button',
                        ScopeInterface::SCOPE_WEBSITE
        );
    }

    /**
     * Call the curl endpoint for complete order API
     */
    public function setCaptureCurlendpoint($transactionId, $params_body, $response_access_token) {

        $url = $this->getcompleteOrderAPI() . $transactionId . '/capture';

        /* Create curl factory */
        $httpAdapter = $this->curlFactory->create();
        $header[] = 'Content-Type: application/json';
        $header[] = 'Referrer-Policy: no-referrer-when-downgrade';
        $header[] = "Authorization: Bearer " . $response_access_token;

        /* Forth parameter is POST body */
        $httpAdapter->write(\Zend_Http_Client::POST, $url, '1.1', $header, $params_body);
        $result = $httpAdapter->read();
        $body = \Zend_Http_Response::extractBody($result);
        /* convert JSON to Array */
        $response = $this->jsonHelper->jsonDecode($body);
        return $response;
    }

}
