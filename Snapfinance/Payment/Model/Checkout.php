<?php
namespace Snapfinance\Payment\Model;

use Magento\Sales\Model\Order\Email\Sender\OrderSender;
use Magento\Sales\Model\ResourceModel\Report\Order;
use Magento\Customer\Api\Data\CustomerInterface as CustomerDataObject;
use Magento\Quote\Api\CartManagementInterface;
use Magento\Checkout\Model\Session;
use Snapfinance\Payment\Helper\Data;


class Checkout
{
    
    protected $customerId;

    protected $checkoutSession;

    protected $quoteManagement;

    protected $quote;

    protected $customerSession;

    protected $checkoutData;

    protected $order;

    protected $orderSender;

    public function __construct(
        CartManagementInterface $cartManagement,
        \Magento\Customer\Model\Session $customerSession,
        \Magento\Checkout\Helper\Data $checkoutData,
        OrderSender $orderSender,
        Session $checkoutSession,
        Data $snaphelper,
        \Magento\Sales\Model\Order\Payment\Transaction\BuilderInterface $transaction,
        $params = array()
    ) {
       
        $this->customerSession = $customerSession;
        $this->checkoutData = $checkoutData;
        $this->orderSender = $orderSender;
        $this->checkoutSession = $checkoutSession;
        $this->quoteManagement = $cartManagement;
        $this->quote = $this->checkoutSession->getQuote();
        $this->snapHelper = $snaphelper;
        $this->_transactionBuilder = $transaction;
        $this->_customerSession = isset($params['session'])
        && $params['session'] instanceof \Magento\Customer\Model\Session ? $params['session'] : $customerSession;
    }

    /**
     * Place order based on prepared quote
     */
    public function place($application_id)
    {
        if (!$this->quote->getGrandTotal()) {
            throw new \Magento\Framework\Exception\LocalizedException(
                __('Snap can\'t process orders with a zero balance due. '. 'To finish your purchase, please go through the standard checkout process.')
            );
        }
        if (!$application_id) {
            throw new \Magento\Framework\Exception\LocalizedException(
                __('Application Id is missing, some problem with response from Snap Finance happened.')
            );
        }
        $this->initToken($application_id);
        if ($this->getCheckoutMethod() == \Magento\Checkout\Model\Type\Onepage::METHOD_GUEST) {
            $this->prepareGuestQuote();
        }
        $this->quote->collectTotals();
        $this->ignoreAddressValidation();
        $this->order = $this->quoteManagement->submit($this->quote);
         //get payment object from order object
         $payment = $this->order->getPayment();
         $payment->setLastTransId($application_id);
         $payment->setTransactionId($application_id);
         $payment->setAdditionalInformation(
            'checkout_token', $application_id
         );
         $formatedPrice = $this->order->getBaseCurrency()->formatTxt(
            $this->order->getGrandTotal()
        );

         $message = __('The authorized amount is %1.', $formatedPrice);
         $paymentData = array('application_id'=>$application_id);
         //get the object of builder class
         $trans = $this->_transactionBuilder;
         $transaction = $trans->setPayment($payment)
         ->setOrder($this->order)
         ->setTransactionId($application_id)
         ->setAdditionalInformation(
            [\Magento\Sales\Model\Order\Payment\Transaction::RAW_DETAILS => (array) $paymentData]
         )
         ->setFailSafe(true)
         //build method creates the transaction and returns the object
         ->build(\Magento\Sales\Model\Order\Payment\Transaction::TYPE_CAPTURE);

         $payment->addTransactionCommentsToOrder(
             $transaction,
             $message
         );
         $payment->setParentTransactionId(null);
         $payment->save();
         $this->order->save();
        switch ($this->order->getState()) {
            // even after placement paypal can disallow to authorize/capture, but will wait until bank transfers money
            case \Magento\Sales\Model\Order::STATE_PENDING_PAYMENT:
                // TODO
                break;
            // regular placement, when everything is ok
            case \Magento\Sales\Model\Order::STATE_PROCESSING:
            case \Magento\Sales\Model\Order::STATE_COMPLETE:
            case \Magento\Sales\Model\Order::STATE_PAYMENT_REVIEW:
                $this->orderSender->send(($this->order));
                $this->checkoutSession->start();
                break;
            default:
                break;
        }
    }

    /**
     * Retrieve customer session object
     *
     * @return \Magento\Customer\Model\Session
     */
    protected function getCustomerSession()
    {
        return $this->customerSession;
    }

    /**
     * Get method checkout
     *
     * @return string
     */
    protected function getCheckoutMethod()
    {
        if ($this->getCustomerSession()->isLoggedIn()) {
            return \Magento\Checkout\Model\Type\Onepage::METHOD_CUSTOMER;
        }
        if (!$this->quote->getCheckoutMethod()) {
            if ($this->checkoutData->isAllowedGuestCheckout($this->quote)) {
                $this->quote->setCheckoutMethod(\Magento\Checkout\Model\Type\Onepage::METHOD_GUEST);
            } else {
                $this->quote->setCheckoutMethod(\Magento\Checkout\Model\Type\Onepage::METHOD_REGISTER);
            }
        }
        return $this->quote->getCheckoutMethod();
    }

    /**
     * Prepare quote for guest checkout order submit
     *
     * @return $this
     */
    protected function prepareGuestQuote()
    {
        $quote = $this->quote;
        $quote->setCustomerId(null)
            ->setCustomerEmail($quote->getBillingAddress()->getEmail())
            ->setCustomerIsGuest(true)
            ->setCustomerGroupId(\Magento\Customer\Model\Group::NOT_LOGGED_IN_ID);
        return $this;
    }

    /**
     * Make sure addresses will be saved without validation errors
     *
     * @return void
     */
    protected function ignoreAddressValidation()
    {
        $this->quote->getBillingAddress()->setShouldIgnoreValidation(true);
        if (!$this->quote->getIsVirtual()) {
            $this->quote->getShippingAddress()->setShouldIgnoreValidation(true);
            if (!$this->snapHelper->IsrequiredbillingAddress()
                && !$this->quote->getBillingAddress()->getEmail()
            ) {
                $this->quote->getBillingAddress()->setSameAsBilling(1);
            }
        }
    }

    /**
     * Setter for customer
     *
     * @param CustomerDataObject $customerData
     * @return $this
     */
    public function setCustomerData(CustomerDataObject $customerData)
    {
        $this->quote->assignCustomer($customerData);
        $this->customerId = $customerData->getId();
        return $this;
    }

    /**
     * Retrieve order instance
     *
     * @return mixed
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * Init token
     * Save payment quote information to additional information
     *
     * @param string $token
     */
    protected function initToken($token)
    {
        if ($token) {
            /* $payment = $this->quote->getPayment();
            $payment->setTransactionId($token); */
           /*  $payment->setIsTransactionClosed(0);
            $payment->setParentTransactionId(null); */
            /* $payment->setAdditionalInformation('checkout_token', $token);
            $payment->save(); */
        }
    }

    /**
     * Setter for customer with billing and shipping address changing ability
     *
     * @param CustomerDataObject $customerData
     * @param Address|null $billingAddress
     * @param Address|null $shippingAddress
     * @return $this
     */
    public function setCustomerWithAddressChange(
        CustomerDataObject $customerData,
        $billingAddress = null,
        $shippingAddress = null
    ) {
        $this->quote->assignCustomerWithAddressChange($customerData, $billingAddress, $shippingAddress);
        $this->customerId = $customerData->getId();
        return $this;
    }
}
