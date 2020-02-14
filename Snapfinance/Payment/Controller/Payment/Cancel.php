<?php
namespace Snapfinance\Payment\Controller\Payment;

use Magento\Framework\App\ResponseInterface;
use Magento\Framework\App\Action\Action;


class Cancel extends \Magento\Framework\App\Action\Action
{

    public function execute()
    {
        $resultRedirect = $this->resultRedirectFactory->create();
        $resultRedirect->setPath('checkout');
        return $resultRedirect;
    }
}
