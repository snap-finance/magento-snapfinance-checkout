define(
    [
        'jquery',
        'Magento_Checkout/js/view/payment/default'
    ],
    function ($,Component) {
        'use strict';
 
        return Component.extend(
            {
                defaults: {
                    template: 'Snapfinance_Payment/payment/snap_finance'
                },
                getSnapLogoSrc: function () {
                    return window.checkoutConfig.payment['snap_payment'].logoSrc;
                },
                getcloseImgSrc: function () {
                    return window.checkoutConfig.payment['snap_payment'].closeimage;
                },
                getSnapUrl: function () {
                    return window.checkoutConfig.payment['snap_payment'].snap_url;
                },
                snapClick : function () {
                    $(".snap-finance-modal").addClass("open");
                },
                btnClose : function () {
                    $(".snap-finance-modal").removeClass("open");
                },
                btnApply : function () {
                    $(".snap-finance-modal").removeClass("open");
                    return true;
                },
                callUrl : function () {
                    alert("Default action in Click Binding is allowed here !!! You are redirected to link.");
                     return true;
                }
            }
        );
    }
);