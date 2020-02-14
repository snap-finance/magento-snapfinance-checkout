define([
    "jquery",
    "underscore",
    "Magento_Checkout/js/model/quote",
    "mage/url",
    'Magento_Customer/js/model/customer',
    'Snapfinance_Payment/js/action/initAction'
], function ($,_, quote, url, customer,initAction) {
    'use strict';
    return {
        products: [],
        customer: null,
        billing: null,
        discounts: null,
        orderId: null,
        shippingAmount: null,
        taxAmount: null,
        totalAmount: null,
       
       
        getData: function(orderId) {
            var _self = this;
            this.setOrderId(orderId);
            this.prepareItems();
            this.prepareTotals();
            return {
                products: _self.products,
                orderId: _self.orderId,
                //shipping_amount: _self.shippingAmount,
                taxAmount: _self.taxAmount,
                totalAmount: _self.totalAmount,
                customer: _self.shippingAddress('shipping')
              /*   billing: _self.prepareAddress('billing'),
                discounts: _self.discounts */
            }
        },

        /**
         * Prepare items data
         */
        prepareItems: function() {
            var quoteItems = quote.getItems();
            for (var i=0; i < quoteItems.length; i++) {
                this.products.push({
                    productId : quoteItems[i].name,
                    description : quoteItems[i].sku,
                    price : quoteItems[i].price,
                    quantity : quoteItems[i].qty,
                });
            }
        },

        /**
         * Set order id
         *
         * @param orderId
         */
        setOrderId: function(orderId) {
            if (orderId) {
                this.orderId = orderId;
            }
        },

        /**
         * Prepare totals data
         */
        prepareTotals: function() {
            var totals = quote.getTotals()();
           /*  this.shippingAmount = this.convertPriceToCents(totals.base_shipping_amount);
            this.totalAmount = this.convertPriceToCents(totals.base_grand_total);
            this.taxAmount = this.convertPriceToCents(totals.base_tax_amount); */
            this.shippingAmount = totals.base_shipping_amount;
            this.totalAmount = totals.base_grand_total;
            this.taxAmount = totals.base_tax_amount;
        },

        /**
         * Convert price to cents
         *
         * @param price
         * @returns {*}
         */
        convertPriceToCents: function(price) {
            if (price && price > 0) {
                price = Math.round(price*100);
                return price;
            }
            return 0;
        },

        /**
         * Prepare address data
         *
         * @param type
         * @returns {{}}
         */
        prepareAddress: function(type) {
            var name, address, fullname, street, result = {};
            if (type == 'shipping') {
                address = quote.shippingAddress();
            } else if (type == 'billing') {
                address = quote.billingAddress();
            }
            if (address.lastname) {
                fullname = address.firstname + ' ' + address.lastname;
            } else {
                fullname = address.firstname;
            }
            name = {
                "full": fullname
            };
            if (address.street[0]) {
                street = address.street[0];
            }
            result["address"] = {
                "line1": street,
                "city": address.city,
                "state": address.regionCode,
                "zipcode": address.postcode,
                "country": address.countryId
             };
            result["name"] = name;
            if (address.street[1]) {
                result.address.line2 = address.street[1];
            }
            if (address.telephone) {
                result.phone_number = address.telephone;
            }
            if (!customer.isLoggedIn()) {
                result.email = quote.guestEmail;
            } else if (customer.customerData.email) {
                result.email = customer.customerData.email;
            }
            return result;
        },
        shippingAddress: function(type) {
            var name, address, fullname, street, result = {};
            if (type == 'shipping') {
                address = quote.shippingAddress();
            } else if (type == 'billing') {
                address = quote.billingAddress();
            }
            if (address.lastname) {
                fullname = address.firstname + ' ' + address.lastname;
            } else {
                fullname = address.firstname;
            }
            name = {
                "full": fullname
            };
            if (address.street[0]) {
                street = address.street[0];
            }
           

            result["firstName"] = address.firstname;
            result["lastName"] = address.lastname;
            if (address.street[1]) {
                street = street + address.street[1];
            }
            if (address.telephone) {
              //  result.phone_number = address.telephone;
            }
            if (!customer.isLoggedIn()) {
                result.email = quote.guestEmail;
            } else if (customer.customerData.email) {
                result.email = customer.customerData.email;
            }
            result["homeAddress"] = {
                streetAddress: street,
                city: address.city,
                state: address.regionCode,
                zipCode: address.postcode
            }
            if(address.regionCode != undefined)
            {
                result["homeAddress"].state = address.regionCode;
            }else{
                result["homeAddress"].state = address.region;
            }
            return result;
        },

        /**
         * Specify order Data
         *
         * @param data
         */
        prepareOrderData: function(data) {
            if (data.order_increment_id !== 'undefined') {
                this.orderId = data.order_increment_id;
            }
            if (data.discounts) {
                this.setDiscounts(data.discounts);
            }
        },

        /**
         * Add items
         *
         * @param items
         */
        addItems: function (items) {
            if (items !== 'undefined') {
                this.products = _.union(this.products, items);
            }
        },

        /**
         * Specify discount
         *
         * @param discounts
         */
        setDiscounts: function(discounts) {
            if (discounts) {
                this.discounts = discounts;
            }
        }
    }
});
