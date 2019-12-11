<?php
namespace Snapfinance\Payment\Block;

use Magento\Store\Model\ScopeInterface;
use Magento\Framework\View\Element\Template;
use Magento\Catalog\Block\ShortcutInterface;
use Magento\Checkout\Model\Session;
use Magento\Payment\Model\MethodInterface;
use Magento\Framework\View\Element\Template\Context;
use Snapfinance\Payment\Model\Config;



/**
 * Class Banner
 *
 * @package Snapfinance\Payment\Block
 */
class Button extends \Magento\Framework\View\Element\Template implements ShortcutInterface
{
    const ALIAS_ELEMENT_INDEX = 'alias';

    
    /**
     * @var Session
     */
    private $checkoutSession;

    protected $helper;

    /**
     * @var Config
     */
    private $config;

    /**
     * @var MethodInterface
     */
    private $payment;

    public function __construct(
        Context $context,
        Session $checkoutSession,
        Config $config,
        \Snapfinance\Payment\Helper\Data $helper,
        array $data = array()
    ) {
        $this->_isScopePrivate = true;
        parent::__construct($context, $data);
        $this->config = $config;
        $this->helper = $helper;
        $this->checkoutSession = $checkoutSession;
    }
    protected function _prepareLayout()
    {
        parent::_prepareLayout();
        $this->setTemplate('Snapfinance_Payment::button.phtml');
        return $this;
    }
    /**
     * @inheritdoc
     */
    protected function _toHtml()
    {
        if($this->isActive()) {
            return parent::_toHtml();
        }

        return '';
    }
    public function getSnapLogo()
    {
        return $this->getViewFileUrl($this->helper->getLogo());
    }
    /**
     * @inheritdoc
     */
    public function getAlias()
    {
        return "snap-finance-button";
    }

    /**
     * @return string
     */
    public function getContainerId()
    {
        return "snap-finance-button";
    }
    public function isActive()
    {
        return $this->config->isActive() && $this->config->isDisplayShoppingCart();
    }
    protected function GetMerchantKey()
    {
        return $this->helper->GetMerchantKey();
    }
    public function getSnapUrl()
    {
        return $this->helper->getSnapUrl();
    }
    

}
