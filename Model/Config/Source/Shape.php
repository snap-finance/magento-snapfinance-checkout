<?php
namespace Snapfinance\Payment\Model\Config\Source;

class Shape implements \Magento\Framework\Option\ArrayInterface
{
    const PILL = 'pill';
    const ROUNDED  = 'rounded';
    const RECT  = 'rect';
    /**
     * {@inheritdoc}
     */
    public function toOptionArray()
    {
        return array(
            array(
                'value' => self::PILL,
                'label' => __('Pill')
            ),
            array(
                'value' => self::ROUNDED,
                'label' => __('Rounded')
            ),
            array(
                'value' => self::RECT,
                'label' => __('Rectangular')
            )
            
        );
    }
}
