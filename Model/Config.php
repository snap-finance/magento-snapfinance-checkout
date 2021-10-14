<?php
 
namespace Snapfinance\Payment\Model;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Payment\Model\CcConfig;
class Config extends \Magento\Payment\Gateway\Config\Config
{
    const KEY_ACTIVE = 'active';


    const KEY_DISPLAY_ON_SHOPPING_CART = 'display_on_shopping_cart';

    /**
     * @var CcConfig
     */
    private $ccConfig;

    /**
     * @var array
     */
    private $icon = array();

    /**
     * Initialize dependencies.
     *
     * @param ScopeConfigInterface $scopeConfig
     * @param CcConfig             $ccConfig
     * @param null                 $methodCode
     * @param string               $pathPattern
     */
    public function __construct(
        ScopeConfigInterface $scopeConfig,
        CcConfig $ccConfig,
        $methodCode = null,
        $pathPattern = self::DEFAULT_PATH_PATTERN
    ) {
        parent::__construct($scopeConfig, $methodCode, $pathPattern);
        $this->ccConfig = $ccConfig;
    }

    /**
     * Get Payment configuration status
     *
     * @return bool
     */
    public function isActive()
    {
        return (bool)$this->getValue(self::KEY_ACTIVE);
    }

    /**
     * @return bool
     */
    public function isDisplayShoppingCart()
    {
        return (bool)$this->getValue(self::KEY_DISPLAY_ON_SHOPPING_CART);
    }

}