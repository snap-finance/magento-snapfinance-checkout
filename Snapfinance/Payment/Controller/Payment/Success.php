<?php

namespace Snapfinance\Payment\Controller\Payment;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Framework\App\ResponseInterface;
use Magento\Quote\Api\CartManagementInterface;
use Magento\Checkout\Model\Session;
use Snapfinance\Payment\Model\Checkout;
use Magento\Framework\Exception\LocalizedException;

class Success extends Action
{
    /**
     * Checkout session
     *
     * @var \Magento\Checkout\Model\Session
     */
    protected $checkoutSession;

    /**
     * Quote management
     *
     * @var \Magento\Quote\Api\CartManagementInterface
     */
    protected $quoteManagement;

    /**
     * Snapfinance checkout instance
     *
     * @var \Snapfinance\Payment\Model\Checkout
     */
    protected $checkout;

    /**
     * Store sales quote
     *
     * @var \Magento\Quote\Model\Quote
     */
    protected $quote;

  
    public function __construct(
        Context $context,
        CartManagementInterface $quoteManager,
        Session $checkoutSession,
        Checkout $checkout
    ) {
        $this->checkout = $checkout;
        $this->checkoutSession = $checkoutSession;
        $this->quoteManagement = $quoteManager;
        $this->quote = $checkoutSession->getQuote();
        parent::__construct($context);
    }

    /**
     * Dispatch request
     *
     * @return \Magento\Framework\Controller\ResultInterface|ResponseInterface
     * @throws \Magento\Framework\Exception\NotFoundException
     */
    public function execute()
    {
        $application_id = $this->getRequest()->getParam('application_id');
        if ($application_id) {
            $this->checkout->place($application_id);
            $this->checkoutSession->clearHelperData();

            $quoteId = $this->quote->getId();
            $this->checkoutSession->setLastQuoteId($quoteId)->setLastSuccessQuoteId($quoteId);

            $order = $this->checkout->getOrder();
            if ($order) {
                $this->checkoutSession->setLastOrderId($order->getId())
                    ->setLastRealOrderId($order->getIncrementId())
                    ->setLastOrderStatus($order->getStatus());
            }
            $this->_eventManager->dispatch(
                'snap_place_order_success',
                ['order' => $order, 'quote' => $this->quote ]
            );
            $this->_redirect('checkout/onepage/success');
            return;
            /* try {
                $this->checkout->place($application_id);
                $this->checkoutSession->clearHelperData();

                $quoteId = $this->quote->getId();
                $this->checkoutSession->setLastQuoteId($quoteId)->setLastSuccessQuoteId($quoteId);

                $order = $this->checkout->getOrder();
                if ($order) {
                    $this->checkoutSession->setLastOrderId($order->getId())
                        ->setLastRealOrderId($order->getIncrementId())
                        ->setLastOrderStatus($order->getStatus());
                }
                $this->_eventManager->dispatch(
                    'snap_place_order_success',
                    ['order' => $order, 'quote' => $this->quote ]
                );
                $this->_redirect('checkout/onepage/success');
                return;
            } catch (LocalizedException $e) {
                $this->messageManager->addExceptionMessage(
                    $e,
                    $e->getMessage()
                );
                $this->_redirect('checkout/cart');
            } catch (\Exception $e) {
                $this->messageManager->addExceptionMessage(
                    $e,
                    __('We can\'t place the order.')
                );
                $this->_redirect('checkout/cart');
            } */
        }
    }
}
