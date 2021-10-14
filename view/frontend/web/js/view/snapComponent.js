define([
    "jquery",
    'uiElement',
    "Snapfinance_Payment/js/action/snapaction",
    "Snapfinance_Payment/js/action/initAction"
], function ($,Component,snapaction,initAction) {
    'use strict';

    var checkoutConfig = window.checkoutConfig;

    return Component.extend({
        defaults: {
            template: 'Snapfinance_Payment/snapComponent'
        },
        initialize: function () {
            this._super();
            $.when(snapaction()).done(function(response){
            }).fail(function(response){
            });
        },

        isActive:function(){
            return true;
        }



    });
});