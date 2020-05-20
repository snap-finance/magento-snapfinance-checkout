# Magento checkout plugin
## Description

Snap Finance checkout provides eCommerce merchants with a set of APIs to offer an in-context finance option to their customers at the time of checkout. 
The Snap JavaScript library, aka "snap-sdk (client)", is a script provided to eCommerce merchants as "snap-sdk.js", for inclusion in their website. The script enables the merchant to include a Snap Checkout button on their website, enabling their customers to use Snap to finance their online purchase.

Snap Finance’s Magento checkout plugin offers an easy way to enable your Magento powered eCommerce store to offer Lease to Buy finance options.

## Installation

1. Your​ ​ Magento​ ​Snap Finance Checkout extension​ can​ ​be​ ​installed​ ​in​ a few 
minutes​ ​ by​ ​ going​ ​ through​ ​ these​ ​ following​ ​ steps
    1. Download/purchase the Snap Finance Extension.
    2. Unzip the file in temporary directory
    3. Upload it to your app/code root directory.
    4. After the successful installation you have to Enable module by:
    	1. php bin/magento setup:upgrade
    	2. php bin/magento setup:di:compile
    	3. php bin/magento setup:static-content:deploy -f
    	4. php bin/magento indexer:reindex
    	5. php bin/magento cache:flush
    	6. sudo chmod 777 -R var/ generated/ pub/static/

2. Configure Plugin:- 
	1. Login to Magento admin and open Magento Settings. 
   	2. If you want to enable Snap finance checkout payment method follow the below the step:
	      1. Open the Magento Store Configration
	      2. Click on Sales tab then click on Payment Methods and then click on 'Snap Finance Checkout'.
		  3. Enable/Disable – Select Yes to enable the module
		  4. Mode-  “Sandbox” for sandbox/test operation and “Production” for live operation.
		  5. Client ID – Enter Client ID which you will receive from your developer account on Snap Finance Website.
	 	  6. Client Secret Key – Enter Client Secret Key which you will receive from your developer account on Snap Finance Website.
	 	  7. Minimum Order total- set the minimum order value to use the Snap Finance Payment method.
	 	  8. Maximum Order total- set the maximum order value to use the Snap Finacne Payment method.
	 	  9. Checkout Button Color - set the button color dark or light
		  10.Checkout Button Shape  - set the button style and shape
		  11.Checkout Button Height - set the button height 


3. After the Done all settings you have to run following command:
    	1. php bin/magneto cache:flush	

4. Order Complete Api Callback 
	1. After processing order, merchant needs to complete order from Magento backend.
	2. This process will call API - POST /v2/internal/application/complete/{applicationId}
	3. This will get Application Status from Snap Finance.
	
**Note** Always keep a backup of your existing Magento installation including Mysql Database, before installing a new plugin.

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