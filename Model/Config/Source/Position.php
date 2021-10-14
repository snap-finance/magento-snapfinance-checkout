<?php
namespace Snapfinance\Payment\Model\Config\Source;

class Position implements \Magento\Framework\Option\ArrayInterface
{
    public function toOptionArray()
    {
        return array(
            '0' => __('Center top'),
            '1' => __('Center bottom')
        );
    }

    /**
     * Get checkout Page Banner position
     *
     * @return array
     */
    public function getCartPosition()
    {
        return array(
            '2' => __('Near checkout button'),
        );
    }
}
