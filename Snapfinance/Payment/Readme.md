# Magento checkout plugin
## Description

Snap Finance checkout provides eCommerce merchants with a set of APIs to offer an in-context finance option to their customers at the time of checkout. 
The Snap JavaScript library, aka "snap-sdk (client)", is a script provided to eCommerce merchants as "snap-sdk.js", for inclusion in their website. The script enables the merchant to include a Snap Checkout button on their website, enabling their customers to use Snap to finance their online purchase.

Snap Finance’s Magento checkout plugin offers an easy way to enable your Magento powered eCommerce store to offer Lease to Buy finance options.

## Installation

1. Pull the Snap Finance checkout extension from Github and follow the below step:
    1. Make Snapfinance/Payment folder inside the app/code folder.
    2. After the place folder inside the app/code run the following command:
    	1. php bin/magento setup:upgrade
    	2. php bin/magento setup:di:compile
    	3. php bin/magento setup:static-content:deploy -f
    	4. php bin/magento indexer:reindex
    	5. php bin/magento cache:flush
    	6. sudo chmod 777 -R var/ generated/ pub/static/

2. Configure Plugin:- 
	1. Login to Magento admin and open Magento Settings. 
	2. Click on General tab and then on ‘Snap Finance Checkout’ plugin.
		1. Enable/Disable – Select Yes to enable the module.
		2. Mode-  “Stage” for sandbox/test operation and “Production” for live operation.
		3. Merchant key- Configure Merchant Key URL for Snap Finance.
		4. Logo Style- There are 5 different logo style available, you can display it on checkout page.
		5. Banner Style – Select Banner style you want to get appear on your website pages / product pages etc.
   	
	3.  If you want to enable Snap finance checkout payment method follow the below the step:
	    1.  Open the Magento Store Configuration
	    2.  Click on Sales tab then click on Payment Methods and then click on 'Snap Finance Checkout'.
	    3.  Enable/Disable - Select Yes to enable the module
	    4.  Mode - 'Stage' for sandbox/test operation and 'Production' for live operation.
	    5.  Client ID - Enter Client ID which you will receive from your developer account on Snap Finance Website.
	    6.  Client Secret Key - Enter Client Secret Key which you will receive from your developer account on Snap Finance Website.
	    7.  Minimum Order total - You can set the minimum order value to use the Snap Finance Payment method.
	    8.  Maximum Order total - You can set the maximum order value to use the Snap Finance Payment method.
	    9.  Display on Shopping Cart: If you want to to show checkout button on Cart page Select 'Yes'.
	 10.  Option to change button style in Admin Setting [Color : Dark / Light, Shape : Pill/ Rounded/ Rectangle, Height : 25-55 ( default 55)]


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

