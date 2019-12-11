<?php
namespace Snapfinance\Payment\Block;

use Magento\Store\Model\ScopeInterface;
use Magento\Framework\View\Element\Template;
use Snapfinance\Payment\Helper;

/**
 * Class Banner
 *
 * @package Snapfinance\Payment\Block
 */
class Banner extends \Magento\Framework\View\Element\Template
{
    protected $page_section;

    protected $position;

    protected $helper;

    const Code = 'snap';

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Snapfinance\Payment\Helper\Data $helper,
        array $data = array()
    ) {
        $this->helper = $helper;
        $this->position = isset($data['position']) ? $data['position']: '';
        $this->page_section = isset($data['page_section']) ? $data['page_section']: 0;
        parent::__construct($context, $data);
    }
    
    public function IsPageDisplayEnable($section)
    {
        $pageSection = $this->_scopeConfig->getValue(
            'snap/' . self::Code . '_' . $section . '/' . 'enabled',
            ScopeInterface::SCOPE_WEBSITE
        );
        return $pageSection ? $pageSection : 0;
    }

    public function getBannerPosition($section)
    {
        $postion = $this->_scopeConfig->getValue(
            'snap/' . self::Code . '_' . $section . '/' . 'position',
            ScopeInterface::SCOPE_WEBSITE
        );
        return $postion ? $postion : 0;
    }
    
    public function getSnapUrl()
    {
        return $this->helper->getSnapUrl();
    }

  

    public function getBanner()
    {
        return $this->getViewFileUrl($this->helper->getImage($this->page_section));
    }
    public function getSnapLogo()
    {
        return $this->getViewFileUrl($this->helper->getLogo());
    }
    

    protected function _toHtml()
    {
        if (!$this->helper->GetEnable() || !$this->helper->GetMerchantKey()) {
            return '';
        }

        $is_enable_banner  = $this->IsPageDisplayEnable($this->page_section);
        $position = $this->getBannerPosition($this->page_section);

        if (!$is_enable_banner) {
            return '';
        }

        if ($this->position != $position) {
            return '';
        }

        return parent::_toHtml();
    }

   
}
