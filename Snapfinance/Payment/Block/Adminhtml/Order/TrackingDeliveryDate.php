<?php

namespace Snapfinance\Payment\Block\Adminhtml\Order;

class TrackingDeliveryDate extends \Magento\Backend\Block\Template
{
    /**
     * @var string
     */

    public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Snapfinance\Payment\Helper\Data $helper,
        \Magento\Sales\Api\OrderRepositoryInterface $orderRepository,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->orderRepository = $orderRepository;
        $this->helper = $helper;
    }

    protected function _prepareLayout()
    {       
        parent::_prepareLayout();
        $this->setTemplate('Snapfinance_Payment::order/tracking_delivery_date.phtml');
        return $this;
    }

    /**
     * @return
     */
    protected function _toHtml()
    {
        if ( !$this->helper->isModuleEnable() ||  $this->helper->isModuleEnable() ==0) {
            return '';
        }
        return parent::_toHtml();
    }

    public function getCustomPaymentMethod(){
    
        $orderId =  $this->getRequest()->getParam('order_id');
        $order = $this->orderRepository->get($orderId);
        $payment = $order->getPayment();
        $method = $payment->getMethodInstance();
       //echo $method->getTitle(); // Cash On Delivery
        return $method->getCode(); // cashondelivery
    }

}