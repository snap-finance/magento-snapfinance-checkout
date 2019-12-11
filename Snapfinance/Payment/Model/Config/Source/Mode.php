<?php
namespace Snapfinance\Payment\Model\Config\Source;

class Mode implements \Magento\Framework\Option\ArrayInterface
{
    const STAGE = 'stage';
    const PRODUCTION  = 'production';
    /**
     * {@inheritdoc}
     */
    public function toOptionArray()
    {
        return array(
            array(
                'value' => self::STAGE,
                'label' => __('Stage')
            ),
            array(
                'value' => self::PRODUCTION,
                'label' => __('Production')
            )
        );
    }
}
