<?php
namespace Snapfinance\Payment\Helper;

use Magento\Framework\App\Helper\Context;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;
use Snapfinance\Payment\Model\Ui\ConfigProvider;

class Data extends \Magento\Framework\App\Helper\AbstractHelper
{
    const Code = 'snap';
    const API_HOST = "https://auth-sandbox.snapfinance.com";
    const KEY_CLIENTKEY_SANDBOX = 'payment/snap_payment/client_id';
    const KEY_CLIENT_SECRET_SANDBOX = 'payment/snap_payment/client_secret';
    const KEY_CLIENTKEY_PRODUCTION = 'payment/snap_payment/client_id_production';
    const KEY_CLIENT_SECRET_PRODUCTION = 'payment/snap_payment/client_secret_production';

    public function __construct(Context $context)
    {
        parent::__construct($context);
    }

    public function getGatewayUrl($scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT)
    {
        return $this->scopeConfig->getValue('snap/general/mode', $scope) == 'stage' ?
        'apply-sandbox.snapfinance.com' : 'www.snapfinance.com';
    }
    public function getSnapUrl()
    {
        return sprintf("https://%s/steps/start?paramId=%s", $this->getGatewayUrl(), $this->GetMerchantKey());
    }
    public function GetEnable()
    {
        return $this->scopeConfig->getValue(
            'snap/general/enabled',
            ScopeInterface::SCOPE_WEBSITE
        );
    }
    public function GetMerchantKey()
    {
        return $this->scopeConfig->getValue(
            'snap/general/merchant_key',
            ScopeInterface::SCOPE_WEBSITE
        );
    }
    public function getBannerStyle($section)
    {
        return  $this->scopeConfig->getValue(
            'snap/' . self::Code . '_' . $section . '/' . 'banner_style',
            ScopeInterface::SCOPE_WEBSITE
        );
    }
    public function getLogoStyle()
    {
        return  $this->scopeConfig->getValue(
            'snap/general/logo_style',
            ScopeInterface::SCOPE_WEBSITE
        );
    }
    public function getImage($section)
    {
        return sprintf('Snapfinance_Payment::images/%s.png', $this->getBannerStyle($section));
    }
    public function getLogo()
    {
        return sprintf('Snapfinance_Payment::images/%s.png', $this->getLogoStyle());
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
        return sprintf("%s/oauth/token", self::API_HOST);
    }

    public function getcompleteOrderAPI()
    {
        return sprintf("https://api-sandbox.snapfinance.com/checkout/v2/internal/application/complete/");
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
}