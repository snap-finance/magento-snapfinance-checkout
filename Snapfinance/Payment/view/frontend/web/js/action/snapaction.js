define([
    "jquery",
    'Magento_Customer/js/customer-data',
    'mage/url',
    'mage/storage',
    'Magento_Checkout/js/model/full-screen-loader',
    'Magento_Checkout/js/model/error-processor',
    'Magento_Ui/js/model/messages',
    "jquery/ui"
], function ($, customerData, urlBuilder, storage, errorProcessor, Messages) {
        'use strict';

        return function () {
            var localdata = localStorage.getItem('snap_token');

            var serviceUrl = urlBuilder.build('/snap/auth/index');
            if (new Date($.localStorage.get('snap_token_timeout')) < new Date()) {
                    var _self = this;
                    storage.post(
                            serviceUrl
                        ).done(
                        function (response) {
                            if (response) {
                                var res = JSON.parse(response);
                                self.access_token = res.access_token;
                                localStorage.setItem('snap_token',res.access_token);
                                var now = new Date();
                               
                                now.setMinutes(now.getMinutes() + 9); // timestamp
                                var current_timestamp = new Date(now); // Date object
                              
                                localStorage.setItem('snap_token_timeout',Number(current_timestamp));
                            }
                            return response;
                        }
                    ).fail(
                        function (response) {
                        }
                    );
            }
        };
    }
);
