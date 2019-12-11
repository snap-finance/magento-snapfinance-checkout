<?php
namespace Snapfinance\Payment\Model\Config\Source;
use Magento\Framework\View\Asset\Repository as AssetRepository;
use Magento\Framework\App\RequestInterface;

class Style implements \Magento\Framework\Option\ArrayInterface
{
     /**
      * @var RequestInterface
      */
    protected $_request;

    /**
     * @var AssetRepository
     */
    protected $_assetRepo;

    /**
     * Style constructor.
     *
     * @param RequestInterface $request
     * @param AssetRepository  $assetRepo
     */
    public function __construct(
        RequestInterface $request,
        AssetRepository $assetRepo
    ) {
        $this->_request = $request;
        $this->_assetRepo = $assetRepo;
    }

    public function toOptionArray()
    {
        $options = array();
        foreach (range(1, 4) as $i) {   
            $options[] = array(
                'value' => "ecomm_btnt0{$i}",
                'label' => sprintf(
                    '<img src="%s" alt="" />',
                    $this->getImageUrl("ecomm_btnt0{$i}.png")
                ),
            );
        }

        return $options;
    }
    public function getlogoOption()
    {
        $options = array();
        foreach (range(1, 5) as $i) {
            $options[] = array(
                'value' => "logo_btn0{$i}",
                'label' => sprintf(
                    '<img src="%s" alt="" />',
                    $this->getImageUrl("logo_btn0{$i}.png")
                ),
            );
        }

        return $options;
    }
    public function getBannerOption()
    {
        $options = array();
        foreach (range(1, 4) as $i) {
            $options[] = array(
                'value' => "ecomm_enbanner0{$i}",
                'label' => sprintf(
                    '<img src="%s" alt="" />',
                    $this->getImageUrl("ecomm_enbanner0{$i}.png")
                ),
            );
        }

        return $options;
    }
    /**
     * Get image url.
     *
     * @param string $fileId
     *
     * @return string
     */
    public function getImageUrl($fileId)
    {
        return $this->_assetRepo->getUrlWithParams(
            "Snapfinance_Payment::images/{$fileId}", array(
            '_secure' => $this->_request->isSecure(),
            )
        );
    }
}
