<?php
namespace Snapfinance\Payment\Model\Config\Source;

class Height implements \Magento\Framework\Option\ArrayInterface
{
  
    public function toOptionArray()
    {
        return array(
            array(
                'value' => 25,
                'label' => 25
            ),
            array(
                'value' => 30,
                'label' =>30
            ),
            array(
                'value' => 35,
                'label' => 35
            ),
            array(
                'value' => 40,
                'label' => 40
            ),
            array(
                'value' => 45,
                'label' =>45
            ),
            array(
                'value' => 50,
                'label' => 50
            ),
            array(
                'value' => 55,
                'label' => 55
            )
            
        );
    }
}
