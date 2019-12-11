<?php

namespace Snapfinance\Payment\Block\System\Config;

use Magento\Framework\Registry;
use Magento\Backend\Block\Template\Context;

class Version extends \Magento\Config\Block\System\Config\Form\Field
{
  
    protected $_coreRegistry;

    protected $moduleResource;

    /**
     * Construct
     *
     * @param \Magento\Backend\Block\Template\Context     $context
     * @param Registry                                    $coreRegistry
     * @param \Magento\Framework\Module\ResourceInterface $moduleResource
     * @param array                                       $data
     */
    public function __construct(
        Context $context,
        Registry $coreRegistry,
        \Magento\Framework\Module\ResourceInterface $moduleResource,
        array $data = array()
    ) {
        $this->_coreRegistry = $coreRegistry;
        $this->moduleResource = $moduleResource;
        parent::__construct($context, $data);
    }

    protected function _getElementHtml(\Magento\Framework\Data\Form\Element\AbstractElement $element)
    {
        return $this->moduleResource->getDbVersion('Snapfinance_Payment');
    }
}
