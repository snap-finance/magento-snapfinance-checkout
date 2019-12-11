define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function (
        Component,
        rendererList
    ) {
        'use strict';
        rendererList.push(
            {
                type: 'snap_payment',
                component: 'Snapfinance_Payment/js/view/payment/method-renderer/snap_payment'
            }
        );
        return Component.extend({});
    }
);