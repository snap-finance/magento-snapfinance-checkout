# Magento checkout plugin
## Description

Snap Checkout provides eCommerce merchants with a flexible set of plugins for popular eCommerce platforms that provide an in-context finance option to their credit-challenged customers at the time of checkout.

Snap Finance’s Magento checkout plugin offers an easy way to enable your Magento powered eCommerce store to offer Lease to Buy finance options.

## Installation

1. Install and Enable the Magento​ ​Snap Finance Extension​
    1. Purchase and download the Snap Finance extension. <!--Will the user know where to purchase the extension?-->
    2. Unzip the file in temporary directory.
    3. Upload the file to your app/code root directory.
    4. After installation, enable the module.
    	1. php bin/magento setup:upgrade
    	2. php bin/magento setup:di:compile
    	3. php bin/magento setup:static-content:deploy -f
    	4. php bin/magento indexer:reindex
    	5. php bin/magento cache:flush
    	6. sudo chmod 777 -R var/ generated/ pub/static/

2. Configure the Plugin
	1. Log in to Magento admin and open Magento settings.
   	2. Enable Snap Finance payment method.
	      1. Open the Magento store configuration.
	      2. Open the Sales tab. <!--Bold "Sales"-->
		  3. Select Payment Methods and Snap Finance. <!--Bold "Payment Methods" and "Snap Finance"-->
		  3. From the Enable/Disable option, select Yes to enable the module <!--Bold "Yes"-->
		  4. From the Mode option, select "Sandbox�? for sandbox/test operation or “Production�? for live operation.
		  5. In the Client ID field, enter the client ID found in your developer account on the Snap Finance website.
	 	  6. In the Client Secret Key field, enter the Client Secret Key found in your developer account on the Snap Finance website.
	 	  7. In the Minimum Order field, set the minimum order value to use with the Snap Finance payment method.
	 	  8. In the Maximum Order field, set the maximum order value to use with the Snap Finance payment method.
	 	  9. Set the Checkout Logo as dark or light.

3. Clear Your Cache
    	1. Run the command: php bin/magneto cache:flush

4. Order Complete API Callback 
After processing an order, the merchant needs to complete the order from Magento back-end. This process calls the API - POST /v2/internal/application/complete/{applicationId} to retrieve the application status from Snap Finance.
	
**Note** Always store a backup of your existing Magento installation, including the Mysql database, before installing a new plugin.

## Frequently Asked Questions

## Screenshots

## Changelog
### 1.0.0
* Initial Release

### 1.0.1
* Error page auto-dismisses issue resolved when user tries to initiates checkout flow once merchant invokes snap support.
* Attempting to checkout with snap on Magento, error appears briefly, then resets to order summary has been resolved.
* Error page gets auto-dismisses issue resolved when user tries to initiates checkout flow once snap admin rotate Client secret of merchant.
* Alice automatically navigates back to "Shipping" page from "Review & Payments" page and error page is not shown while proceeding checkout with STBS states has been resolved.
* "Deny page" gets auto dismissed issue resolved after application gets deny.

### 1.0.2
* Added Dynamic banners
* Send Email to snap Team when Activate/ Deactivate Plugin
* Added Masking in client key and secret

### 1.0.3
* Updated Readme.md File
* Changed the 'Snap Finance Checkout' to 'Snap Finance' in Admin Configuration and removed the checkout graphic image from checkout button.
* Resolved the issue for set the 'Pending Delivery' status in merchant account once the order status made as completed from admin side.
* Changed the Sandbox Checkout Logo URL for S3 bucket