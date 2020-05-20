define(
    [
        'jquery',
        'Magento_Checkout/js/view/payment/default',
        'Snapfinance_Payment/js/action/snapaction',
        'Snapfinance_Payment/js/model/snapModel',
        'Snapfinance_Payment/js/action/initAction',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/action/set-payment-information',
        'Magento_Ui/js/model/messages',
        'mage/storage',
        'Magento_Ui/js/model/messageList'
    ],
    function ($,Component,snapaction,snapModel,initAction,quote,paymentAction,Messages,storage,messageList) {
        'use strict';
 
        return Component.extend(
            {
                defaults: {
                    template: 'Snapfinance_Payment/payment/snap_payment'
                },
                initialize: function () {
                    var _self = this;
                    this.messageContainer = new Messages();
                    this._super();
                },
                getCode: function () {
                    return window.checkoutConfig.payment['snap_payment'].payment_code;
                }, 
                getCheckoutLogo: function() {
                    return window.checkoutConfig.payment['snap_payment'].checkout_logo;
                },
                getCheckoutButton: function() {
                    return window.checkoutConfig.payment['snap_payment'].checkout_button;
                },   
                initObservable: function () {
                    var _self = this;
                    this._super();
                    quote.shippingAddress.subscribe(function (address) {
                        _self.RenderSnap();
                    });
                    return this;
                },
                RenderSnapMark : function()
                {
                   /*  snap.checkoutMark({
                        style: {
                            color: 'dark',
                            height: window.checkoutConfig.payment['snap_payment'].button_height
                        }
                    }).render(); */
                    
                },
                RenderUrl : function()
                {
                    $(".snap_checkout").css("background-image", "url(" + window.checkoutConfig.payment['snap_payment'].checkout_button + ")");
                },
                checkoutButton : function(){
                    var _self = this;console.log('called');
                    $('#snap-checkout-button button').click();
                },
                RenderSnap : function(){
                    var _self = this;
                    $("#snap-checkout-button").empty();
                    var access_token = localStorage.getItem('snap_token');
                    var transaction = [];
                    $.when(initAction()).done(function(response){
                        if(response){
                            _self.selectPaymentMethod();
                            $.when(paymentAction(_self.messageContainer, {'method': _self.getCode()})).done(function() {
                                var order_data = JSON.parse(response);
                                transaction = snapModel.getData(order_data.order_increment_id);
                                snap.init(access_token);
                                $("#snap-checkout-button").empty();
                                snap.checkoutButton({
                                    // Merchant site developer supplies the JWT obtained through Auth0 authentication
                                    // token: get('token'),
                                    //token: access_token,
                            
                                    /* style: {
                                        color: window.checkoutConfig.payment['snap_payment'].button_color,
                                        shape: window.checkoutConfig.payment['snap_payment'].button_shape,
                                        height: window.checkoutConfig.payment['snap_payment'].button_height
                                    }, */
                                    onInit: function (data, actions) {
                                        return actions.validateTransaction(transaction);
                                    },
                                    onClick: function (data, actions) {
                                        return actions.launchCheckout(transaction);
                                    },
                            
                                    onApproved: function (data, actions) {
                                        var  applicationId = data.applicationId;
                                            if(applicationId != '' || applicationId != undefined )
                                            {
                                                var success_url = window.checkoutConfig.payment['snap_payment'].snap_payment_url.success_url + "?application_id=" + applicationId;
                                                $.mage.redirect(success_url);
                                            }   
                                        console.log("onApproved");
                                    },
                            
                                    onDenied: function (data, actions) {
                                        // Snap funding was denied (i.e. approval was less than shopping cart amount)
                                        // Snap will have notified the customer of this in a separate window.
                                        // The merchant site developer can include code here to respond with an appropriate user experience.
                                        //$.mage.redirect(window.checkoutConfig.payment['snap_payment'].snap_payment_url.cancel_url);
                                        if (data.applicationId) {
                                            messageList.addErrorMessage({
                                                message: 'Place order failed for application: ' + data.applicationId
                                            });
                                            if (data.message) {
                                                messageList.addErrorMessage({
                                                    message: data.message
                                                });
                                            }
                                            return false;
                                        }
                                        console.log("onDenied");
                                    },
                            
                                    onCanceled: function(data, actions) {
                                        // The user quit the snap funding process or it was otherwise cancelled.
                                        // The merchant site developer can include code here to respond with an appropriate user experience.
                                        //$.mage.redirect(window.checkoutConfig.payment['snap_payment'].snap_payment_url.cancel_url);
                                        if (data.applicationId) {
                                            messageList.addErrorMessage({
                                                message: 'Place order failed for application: ' + data.applicationId
                                            });
                                            if (data.message) {
                                                messageList.addErrorMessage({
                                                    message: data.message
                                                });
                                            }
                                            return false;
                                        }
                                        console.log("onCanceled");
                                    },
                            
                                    onNotification: function (data, actions) {
                                        // Snap may invoke this method to provide status information to the merchant site.
                                        // Notifications are purely informational and do not require action by the merchant site.
                                        if (data.applicationId) {
                                            messageList.addErrorMessage({
                                                message: 'Place order failed for application: ' + data.applicationId
                                            });
                                            if (data.message) {
                                                messageList.addErrorMessage({
                                                    message: data.message
                                                });
                                            }
                                            return false;
                                        }
                                        console.log("onNotification");
                                    },
                            
                                    onError: function (data, actions) {
                                        // Snap will invoke this method to inform the merchant site of actionable errors.
                                        // The merchant site developer should include code to respond with an error-specific user experience.
                                      //  $.mage.redirect(window.checkoutConfig.payment['snap_payment'].snap_payment_url.cancel_url);
                                      if (data.applicationId) {
                                            messageList.addErrorMessage({
                                                message: 'Place order failed for application: ' + data.applicationId
                                            });
                                            if (data.message) {
                                                messageList.addErrorMessage({
                                                    message: data.message
                                                });
                                            }
                                            return false;
                                        }
                                        console.log("onError");
                                    }
                                    // The render method is invoked here to display the Snap Checkout button
                                }).render();

                            }).fail(function(){
                                self.isPlaceOrderActionAllowed(true);
                            });
                            
                        }
                    }).fail(function(response){
                        console.log(response);
                    });
                }
                
            }
        );
    }
);