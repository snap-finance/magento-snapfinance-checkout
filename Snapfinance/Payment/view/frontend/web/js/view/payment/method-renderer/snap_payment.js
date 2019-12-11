define(
    [
        'jquery',
        'snap',
        'Magento_Checkout/js/view/payment/default',
        'Snapfinance_Payment/js/action/snapaction',
        'Snapfinance_Payment/js/model/snapModel',
        'Snapfinance_Payment/js/action/initAction',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/action/set-payment-information',
        'Magento_Ui/js/model/messages',
        'mage/storage',
    ],
    function ($,snapjs,Component,snapaction,snapModel,initAction,quote,paymentAction,Messages,storage) {
        'use strict';
 
        return Component.extend(
            {
                defaults: {
                    template: 'Snapfinance_Payment/payment/snap_payment'
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
                },
                initialize: function () {
                    var _self = this;
                    console.log(window.checkoutConfig.payment['snap_payment']);
                    this.messageContainer = new Messages();
                    this._super();
                },
                getCode: function () {
                    return window.checkoutConfig.payment['snap_payment'].payment_code;
                },    
                initObservable: function () {
                    var _self = this;
                    this._super();
                    
                    console.log("initObservable");
                    quote.shippingAddress.subscribe(function (address) {
                        console.log("shipping");
                        _self.RenderSnap();
                    });
                    return this;
                },
                RenderSnapMark : function()
                {
                    snap.checkoutMark({
                        style: {
                            color: 'dark',
                            height: 55
                        }
                    }).render();
                    
                },
                RenderSnap : function(){
                    var _self = this;
                    console.log(document.getElementById("snap-checkout-button"));
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
                                snap.checkoutButton({
                                    // Merchant site developer supplies the JWT obtained through Auth0 authentication
                                    // token: get('token'),
                                    //token: access_token,
                            
                                    style: {
                                        color: 'dark',
                                        shape: 'pill',
                                        height: 55
                                    },
                            
                                    onInit(data, actions) {
                                        // This method is invoked when the button is initialized.
                                        // Merchant site developer should include the following code to validate the transaction.
                                        // This will throw an error containing the validation error information.
                                        console.log("onInit");
                                        return actions.validateTransaction(transaction);
                                    },
                            
                                    onClick(data, actions) {
                                        // alert('hello');
                                        // This method is invoked upon click of the Snap Checkout button.
                                        // Merchant site developer should include the following code to invoke checkout:
                                        console.log("onClick");
                                        return actions.launchCheckout(transaction);
                                    },
                            
                                    onApproved(data, actions) {
                                    var  applicationId = data.applicationId;
                                    $.mage.redirect(success_url);
                                        if(applicationId != '' || applicationId != undefined )
                                        {
                                            var success_url = window.checkoutConfig.payment['snap_payment'].snap_payment_url.success_url + "?application_id=" + applicationId;
                                            $.mage.redirect(success_url);
                                        }
                                        //alert(data.applicationId);
                                        // Or, invoke placeOrder immediately like this.
                                        // return actions.placeOrder(data.applicationId).then(() => {
                                        //         // Place Order was successful.
                                        //         alert(`Successfully placed an order on application: ${data.applicationId}.`);
                                        //         // Merchant site should close out the shopping cart and update the purchase status as complete.
                                        //     })
                                        //     .catch(error => {
                                        //         // An error occured while placing the order
                                        //         alert(`Place order failed for application: ${data.applicationId}.`)
                                        //         console.log(`Snap reported error: ${error.message}.`)
                                        //     });
                                        console.log("onApproved");
                                    },
                            
                                    onDenied(data, actions) {
                                        // Snap funding was denied (i.e. approval was less than shopping cart amount)
                                        // Snap will have notified the customer of this in a separate window.
                                        // The merchant site developer can include code here to respond with an appropriate user experience.
                                        $.mage.redirect(window.checkoutConfig.payment['snap_payment'].snap_payment_url.cancel_url);
                                        console.log("onDenied");
                                    },
                            
                                    onCanceled(data, actions) {
                                        // The user quit the snap funding process or it was otherwise cancelled.
                                        // The merchant site developer can include code here to respond with an appropriate user experience.
                                        $.mage.redirect(window.checkoutConfig.payment['snap_payment'].snap_payment_url.cancel_url);
                                        console.log("onCanceled");
                                    },
                            
                                    onNotification(data, actions) {
                                        // Snap may invoke this method to provide status information to the merchant site.
                                        // Notifications are purely informational and do not require action by the merchant site.
                                        console.log("onNotification");
                                    },
                            
                                    onError(data, actions) {
                                        // Snap will invoke this method to inform the merchant site of actionable errors.
                                        // The merchant site developer should include code to respond with an error-specific user experience.
                                        $.mage.redirect(window.checkoutConfig.payment['snap_payment'].snap_payment_url.cancel_url);
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