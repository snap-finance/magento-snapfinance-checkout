<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Snapfinance\Payment\Observer;

use Magento\Framework\Event\Observer;
use Magento\Catalog\Block\ShortcutButtons;
use Magento\Framework\Event\ObserverInterface;

class AddShortcuts implements ObserverInterface
{
    /**
     * Block class
     */
    const SNAP_SHORTCUT_BLOCK = \Snapfinance\Payment\Block\Button::class;
    
    public function execute(Observer $observer)
    {
        // Remove button from catalog pages
        if ($observer->getData('is_catalog_product')) {
            return;
        }

        /**
 * @var ShortcutButtons $shortcutButtons 
*/
        $shortcutButtons = $observer->getEvent()->getContainer();

        $shortcut = $shortcutButtons->getLayout()->createBlock(self::SNAP_SHORTCUT_BLOCK);

        $shortcutButtons->addShortcut($shortcut);
    }
}
