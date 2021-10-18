<?php

namespace Snapfinance\Payment\Plugin;

use Magento\Framework\App\RequestInterface;
use Magento\Framework\App\Config\Storage\WriterInterface;
use Snapfinance\Payment\Helper\Data;
use Magento\Framework\App\Helper\Context;
use Magento\Framework\Translate\Inline\StateInterface;
use Magento\Framework\Escaper;
use Magento\Framework\Mail\Template\TransportBuilder;

class ConfigPlugin {

    protected $inlineTranslation;
    protected $escaper;
    protected $transportBuilder;
    protected $logger;

    const LOGGER_DIR_NAME = 'snap_order';
    const DEV_SUPPORT_EMAIL = 'devsupport@snapfinance.com';

    public function __construct(
            RequestInterface $request,
            WriterInterface $configWriter,
            Data $helper,
            StateInterface $inlineTranslation,
            Escaper $escaper,
            TransportBuilder $transportBuilder,
            \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
            \Snapfinance\Payment\Logger\Logger $logger,
            \Snapfinance\Payment\Logger\Handler $handler
    ) {
        $this->request = $request;
        $this->configWriter = $configWriter;
        $this->helper = $helper;
        $this->inlineTranslation = $inlineTranslation;
        $this->escaper = $escaper;
        $this->transportBuilder = $transportBuilder;
        $this->_scopeConfig = $scopeConfig;
        $this->_logger = $logger;
        $handler->seturl(self::LOGGER_DIR_NAME); //Set the Directory name for logger
    }

    public function getStorename() {
        return $this->_scopeConfig->getValue(
                        'trans_email/ident_sales/name',
                        \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
    }

    public function getStoreEmail() {
        return $this->_scopeConfig->getValue(
                        'trans_email/ident_sales/email',
                        \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
    }

    public function aroundSave(
            \Magento\Config\Model\Config $subject,
            \Closure $proceed
    ) {
        $Params = $this->request->getParam('groups');
        if (isset($Params['snap_payment'])) {
            $is_active = $Params['snap_payment']['fields']['active']['value'];
            if ($this->helper->isModuleEnable() != $is_active) {
                try {
                    $this->inlineTranslation->suspend();
                    $sender = [
                        'name' => $this->getStorename(),
                        'email' => $this->getStoreEmail(),
                    ];
                    $transport = $this->transportBuilder
                            ->setTemplateIdentifier('notify_email_template')
                            ->setTemplateOptions(
                                    [
                                        'area' => \Magento\Framework\App\Area::AREA_FRONTEND,
                                        'store' => \Magento\Store\Model\Store::DEFAULT_STORE_ID,
                                    ]
                            )
                            ->setTemplateVars([
                                'is_active' => ($is_active) ? 'Enabled' : 'Disabled',
                            ])
                            ->setFrom($sender)
                            ->addTo(self::DEV_SUPPORT_EMAIL)
                            ->getTransport();
                    $transport->sendMessage();
                    $this->inlineTranslation->resume();
                } catch (\Exception $e) {
                    $this->inlineTranslation->resume();
                    $this->_logger->critical('Error - Configuration ::' . $e->getMessage());
                }
            }
        }

        // your custom logic
        return $proceed();
    }

}
