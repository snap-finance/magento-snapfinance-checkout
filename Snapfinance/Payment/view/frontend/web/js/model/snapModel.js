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
            
            var shipping_address = $.parseJSON(JSON.stringify(this.shippingAddress()));                        
                        
            //Condition for the shipping amount not null and exist
            var _shippingAmount = (_self.shippingAmount !== 'undefined' && _self.shippingAmount !='') ? parseFloat(_self.shippingAmount).toFixed(2) : "0.00";
            var _discountAmount = (_self.discounts !== 'undefined' && _self.discounts != null && _self.discounts != '') ? parseFloat(_self.discounts * -1).toFixed(2)  : "0.00";
            var _taxAmount = (_self.taxAmount !== 'undefined' && _self.taxAmount != null && _self.taxAmount != '') ? parseFloat(_self.taxAmount).toFixed(2) : "0.00";
        	var _totalAmount = (_self.totalAmount !== 'undefined' && _self.totalAmount != null && _self.totalAmount != '') ? parseFloat(_self.totalAmount).toFixed(2) : "0.00";
        
            return {
                    "cartInformation": {
                        "currencyCode": ""+_self.base_currency_code+"",
                        "taxAmount": ""+_taxAmount+"",
                        "shippingAmount": ""+_shippingAmount+"",
                        "totalAmount": ""+_totalAmount+"",
                        "discountAmount": ""+_discountAmount+"",
                        "orderId": ""+_self.orderId+"",
                        "items": _self.products,
                        
                        "shippingAddress": {
                                "streetAddress": shipping_address.homeAddress.streetAddress,
                                "city": shipping_address.homeAddress.city,
                                "state": shipping_address.homeAddress.state,
                                "country": shipping_address.homeAddress.countryId,
                                "postalCode": shipping_address.homeAddress.zipCode,
                                "unit": ""
                            }
                    }
            }
        },

        /**
         * Prepare items data
         */
        prepareItems: function() {
            var quoteItems = quote.getItems();            
            //console.log('quote_Item::'+JSON.stringify(quoteItems));            
	    this.products = [];
            for (var i=0; i < quoteItems.length; i++) {
                var item_price = quoteItems[i].price;                
                this.products.push({
                    itemId : ""+quoteItems[i].item_id+"",
                    price : ""+parseFloat(item_price).toFixed(2)+"",
                    description : ""+quoteItems[i].name+"",
                    sku: ""+quoteItems[i].sku+"",
                    quantity: quoteItems[i].qty,
                    leasable: true                    
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
            this.base_currency_code = totals.base_currency_code;
        	this.discounts = totals.discount_amount;
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
                        
            console.log('Shipping Address::'+ JSON.stringify(quote.shippingAddress()) );
            address = $.parseJSON(JSON.stringify(quote.shippingAddress()));
            
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
                zipCode: address.postcode,
                countryId: address.countryId
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
        	console.log('Order_Discount'+data.discounts);
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
