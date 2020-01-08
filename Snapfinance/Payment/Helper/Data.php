<?php
namespace Snapfinance\Payment\Helper;

use Magento\Framework\App\Helper\Context;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;
use Snapfinance\Payment\Model\Ui\ConfigProvider;

class Data extends \Magento\Framework\App\Helper\AbstractHelper
{
    const Code = 'snap';
    const API_STAGE_HOST = "https://auth-sandbox.snapfinance.com";
    const API_LIVE_HOST = "https://checkout-prod.auth0.com";
    const AUDIANCE_STAGE = "https://api-sandbox.snapfinance.com/checkout/v2";
    const AUDIANCE_LIVE = "https://api.snapfinance.com/checkout/v2";
    const KEY_CLIENTKEY_SANDBOX = 'payment/snap_payment/client_id';
    const KEY_CLIENT_SECRET_SANDBOX = 'payment/snap_payment/client_secret';
    const KEY_CLIENTKEY_PRODUCTION = 'payment/snap_payment/client_id_production';
    const KEY_CLIENT_SECRET_PRODUCTION = 'payment/snap_payment/client_secret_production';

    public function __construct(Context $context)
    {
        parent::__construct($context);
    }
    public function GetClientID()
    {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ?
        $this->scopeConfig->getValue(self::KEY_CLIENTKEY_PRODUCTION,ScopeInterface::SCOPE_WEBSITE):$this->scopeConfig->getValue(self::KEY_CLIENTKEY_SANDBOX,ScopeInterface::SCOPE_WEBSITE);
    }

    public function GetClientSecret()
    {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ?
        $this->scopeConfig->getValue(
            self::KEY_CLIENT_SECRET_PRODUCTION,
             ScopeInterface::SCOPE_WEBSITE
         ):$this->scopeConfig->getValue(
             self::KEY_CLIENT_SECRET_SANDBOX,
             ScopeInterface::SCOPE_WEBSITE
         );
    }
    public function getAPIHost()
    {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ? 
         sprintf("%s/oauth/token", self::API_LIVE_HOST) :  sprintf("%s/oauth/token", self::API_STAGE_HOST);
    }
    public function getAPIAudiance()
    {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ? 
        sprintf("%s", self::AUDIANCE_LIVE) :  sprintf("%s", self::AUDIANCE_STAGE);
    }

    public function getcompleteOrderAPI()
    {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ? 
        sprintf("https://api.snapfinance.com/checkout/v2/internal/application/complete/") :
        sprintf("https://api-sandbox.snapfinance.com/checkout/v2/internal/application/complete/");
    }

    public function IsrequiredbillingAddress()
    {
        return true;
        //return $this->scopeConfig->getValue('payment/snap_payment/requireBillingAddress',  ScopeInterface::SCOPE_WEBSITE);
    }

    public function getButtonStyle($code)
    {
        return  $this->scopeConfig->getValue(
            'payment/snap_payment/' . $code,
            ScopeInterface::SCOPE_WEBSITE
        );
    }
    public function GetMode()
    {
        return $this->scopeConfig->getValue('payment/snap_payment/mode', ScopeInterface::SCOPE_WEBSITE) == 'production' ? true :false;
    }


}