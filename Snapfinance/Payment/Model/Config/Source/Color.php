<?php
namespace Snapfinance\Payment\Model\Config\Source;

class Color implements \Magento\Framework\Option\ArrayInterface
{
    const DARK = 'dark';
    const LIGHT  = 'light';
    /**
     * {@inheritdoc}
     */
    public function toOptionArray()
    {
        return array(
            array(
                'value' => self::DARK,
                'label' => __('Dark')
            ),
            array(
                'value' => self::LIGHT,
                'label' => __('Light')
            )
        );
    }
}
