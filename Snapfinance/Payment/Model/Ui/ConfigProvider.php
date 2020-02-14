<?php


namespace Snapfinance\Payment\Model\Ui;

use Magento\Framework\UrlInterface;
use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\ProductMetadataInterface;
use Astound\Affirm\Model\Config as ConfigAffirm;
use \Magento\Framework\View\Asset\Repository;
use Snapfinance\Payment\Helper;

/**
 * Class ConfigProvider
 * Config provider for the payment method
 *
 * @package Astound\Affirm\Model\Ui
 */
class ConfigProvider implements ConfigProviderInterface
{
    
    const CODE = 'snap_payment';
    

    /**
     * Affirm config model
     *
     * @var \Astound\Affirm\Model\Config
     */
    

    /**
     * Injected config object
     *
     * @var \Magento\Payment\Gateway\ConfigInterface
     */
    protected $_assetRepo;

    

    /**
     * Injected url builder
     *
     * @var \Magento\Framework\UrlInterface
     */
    protected $urlBuilder;

    /**
     * Product metadata object
     *
     * @var \Magento\Framework\App\ProductMetadataInterface
     */
    protected $productMetadata;

    /**
     * Inject all needed object for getting data from config
     *
     * @param ConfigInterface          $config
     * @param UrlInterface             $urlInterface
     * @param CheckoutSession          $checkoutSession
     * @param ProductMetadataInterface $productMetadata
     * @param ConfigAffirm             $configAffirm
     */
    public function __construct(
        UrlInterface $urlInterface,
        CheckoutSession $checkoutSession,
        ProductMetadataInterface $productMetadata,
        \Magento\Framework\View\Asset\Repository $assetRepo,
        \Snapfinance\Payment\Helper\Data $helper 
    ) {
        
        $this->urlBuilder = $urlInterface;
        $this->checkoutSession = $checkoutSession;
        $this->productMetadata = $productMetadata;
        $this->_assetRepo = $assetRepo;
        $this->helper = $helper;
    }

    /**
     * Retrieve assoc array of checkout configuration
     *
     * @return array
     */
    public function getConfig()
    {
        return array(
            'payment' => array(
                self::CODE => array(
                    'payment_code'=> self::CODE,
                    'button_color'=> $this->helper->getButtonStyle('button_color'),
                    'button_shape'=> $this->helper->getButtonStyle('button_shape'),
                    'button_height'=> $this->helper->getButtonStyle('button_height'),
                    'snap_payment_url' => [
                        'success_url' => $this->urlBuilder
                                ->getUrl('snap/payment/success', ['_secure' => true]),
                        'cancel_url' => $this->urlBuilder
                                ->getUrl('snap/payment/cancel', ['_secure' => true]),
                    ],
                )
            )
        );
    }
}
