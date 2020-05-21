<?php
namespace Snapfinance\Payment\Model\Config\Source;
use Magento\Framework\Xml\Parser;
use Magento\Framework\Module\Dir\Reader;

class CheckoutLogo implements \Magento\Framework\Option\ArrayInterface
{
   
   protected $moduleDirReader;
   protected $parser;


   const URL_PATH  = 'checkout-option';
   const LOGO_STAGE = 'https://d2l11kwwuv5w27.cloudfront.net/';

    public function __construct(Parser $parser,Reader $reader)
    {
       $this->parser = $parser;
       $this->moduleDirReader = $reader;
    }
    /**
     * {@inheritdoc}
     */
    public function toOptionArray()
    {
        $result = [];
        $parsedArray = $this->parser->load(self::LOGO_STAGE)->xmlToArray();
        $url = self::URL_PATH;
        foreach($parsedArray['ListBucketResult']['Contents'] as $key=>$value)
        {
            if(preg_match("/{$url}/", $value['Key'])) {
                $key_data = explode("/",$value['Key']);
                $label = end($key_data);
                $label = preg_replace('/\\.[^.\\s]{3,4}$/', '', $label);
                $label = preg_replace("/[\-_]/", " ", $label);
                
                $result[$key]['value'] = self::LOGO_STAGE . $value['Key'];
                $result[$key]['label'] = $label;
            }
        }
        return $result;
    }
}
