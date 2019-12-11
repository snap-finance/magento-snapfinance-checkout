<?php
namespace Snapfinance\Payment\Api;

interface SnapCheckoutInterface
{
    /**
     * Init payment
     *
     * @return bool|string
     */
    public function initPayment();

}
