<?php
namespace Snapfinance\Payment\Block\System\Config;

use Magento\Backend\Block\Template\Context;
use Magento\Config\Block\System\Config\Form\Field;
use Magento\Framework\View\Helper\Js as JsHelper;
use Magento\Framework\Data\Form\Element\AbstractElement;
use Snapfinance\Payment\Helper\Data;

class CheckoutButton extends Field
{
    /**
     * @var JsHelper
     */
    protected $_jsHelper;

    
    /**
     * Layout constructor.
     *
     * @param JsHelper $jsHelper
     * @param Context  $context
     * @param bool     $livedemoMode
     * @param array    $data
     */
    public function __construct(
        JsHelper $jsHelper,
        Context $context,
        array $data = []
    )
    {
        $this->_jsHelper = $jsHelper;
        parent::__construct($context, $data);
    }

   /**
     * @inheritdoc
     */
    public function render(AbstractElement $element)
    {
        return $this->_getExtraCss() . parent::render($element) . $this->_getExtraJs($element);
    }

    /**
     * @inheritdoc
     */
    protected function _getElementHtml(AbstractElement $element)
    {
        $html = parent::_getElementHtml($element);
        $html .= '<div class="preview">';
        $html .= sprintf(
            '<img src="%s" alt="" style="display:none;" />',
            ""
        );
        $html .= '</div>';
        return $html;
    }

    /**
     * Get extra CSS.
     *
     * @return string
     */
    protected function _getExtraCss()
    {
        return <<<EOL
            <style>
                .preview {
                    margin-top: 15px;
                }
            </style>
EOL;
    }

    /**
     * Get extra javascript.
     *
     * @param AbstractElement $element
     *
     * @return string
     */
    protected function _getExtraJs(AbstractElement $element)
    {
        $output = <<<EOL
            require(['jquery'], function($) {
                $(function() {

                    $('#{$element->getHtmlId()}').change(function() {
                        var image =  $(this).val();
                        $(this).next('.preview').find('img').attr("src",image).show();
                    }).change();
                });
                $(document).ready(function() {
                    var img = $('#{$element->getHtmlId()}').val();
                    $(this).next('.preview').find('img').attr("src",img).show();
                });
            });
EOL;

        return $this->_jsHelper->getScript($output);
    }

}
