<?php

namespace Snapfinance\Payment\Model;

use Snapfinance\Payment\Api\SnapCheckoutInterface;
use Magento\Checkout\Model\Session;
use Magento\Framework\App\ProductMetadataInterface;
use Magento\Framework\ObjectManagerInterface;
use Symfony\Component\Config\Definition\Exception\Exception;

class SnapCheckout implements SnapCheckoutInterface
{
   /**
     * Injected checkout session
     *
     * @var Session
     */
    protected $checkoutSession;

    /**
     * Injected model quote
     *
     * @var \Magento\Quote\Model\Quote
     */
    protected $quote;

    /**
     * Injected repository
     *
     * @var \Magento\Quote\Api\CartRepositoryInterface
     */
    protected $quoteRepository;

    /**
     * Object manager
     *
     * @var \Magento\Framework\ObjectManagerInterface
     */
    protected $objectManager;

    /**
     * Product metadata
     *
     * @var \Magento\Framework\App\ProductMetadataInterface
     */
    protected $productMetadata;

    /**
     * Module resource
     *
     * @var \Magento\Framework\Module\ResourceInterface
     */
    protected $moduleResource;

    public function __construct(
        Session $checkoutSession,
        \Magento\Quote\Api\CartRepositoryInterface $quoteRepository,
        ProductMetadataInterface $productMetadata,
        \Magento\Framework\Module\ResourceInterface $moduleResource,
        ObjectManagerInterface $objectManager
    ) {
        $this->checkoutSession = $checkoutSession;
        $this->quote = $this->checkoutSession->getQuote();
        $this->quoteRepository = $quoteRepository;
        $this->productMetadata = $productMetadata;
        $this->moduleResource = $moduleResource;
        $this->objectManager = $objectManager;
    }

    /**
     * Init payment
     *
     * @return bool|string
     */
    public function initPayment()
    {
        // collection totals before submit
        $this->quote->collectTotals();
        $this->quote->reserveOrderId();
        $orderIncrementId = $this->quote->getReservedOrderId();
        $discountAmount = $this->quote->getBaseSubtotal() - $this->quote->getBaseSubtotalWithDiscount();
        $shippingAddress = $this->quote->getShippingAddress();

        $response = [];
        $response['shipping_address'] = $shippingAddress->getData(); 
        /* if ($discountAmount > 0.001) {
            $discountDescription = $shippingAddress->getDiscountDescription();
            $discountDescription = ($discountDescription) ? sprintf(__('Discount (%s)'), $discountDescription) :
                sprintf(__('Discount'));
            $response['discounts'][$discountDescription] = [
                'discount_amount' => Util::formatToCents($discountAmount)
            ];
        } */
        try {
            $country = $this
                ->quote
                ->getBillingAddress()
                ->getCountry();
            /* $result = $this->quote
                ->getPayment()
                ->getMethodInstance()
                ->canUseForCountry($country);
            if (!$result) {
                throw new \Magento\Framework\Exception\LocalizedException(
                    __('Your billing country isn\'t allowed by Affirm.')
                );
            } */
        } catch (Exception $e) {
            return $e->getMessage();
        }
        if ($orderIncrementId) {
            $this->quoteRepository->save($this->quote);
            $response['order_increment_id'] = $orderIncrementId;
        }
       
       
        return json_encode($response);
    }
}
