<?php

/**
 * Custom Logger
 *
 */

namespace Snapfinance\Payment\Logger;

use Monolog\Logger;
use Magento\Framework\Filesystem\DriverInterface;

class Handler extends \Magento\Framework\Logger\Handler\Base {

    /**
     * Logging level
     * @var int
     */
    protected $loggerType = Logger::INFO;

    /**
     * Custom Path
     * @var string
     */
    protected $path = '/var/log/Snapfinance/CustomLogger/';

    /**
     * current date
     * @var date
     */
    protected $date;

    /**
     * Core Logger object
     * @var string
     */
    protected $logger;

    /**
     * Handler constructor.
     * @param DriverInterface $filesystem
     * @param \Magento\Framework\Stdlib\DateTime\Timezone $timezone
     * @param null $filePath
     */
    public function __construct(
            DriverInterface $filesystem,
            \Magento\Framework\Stdlib\DateTime\Timezone $timezone,
            \Psr\Log\LoggerInterface $logger,
            $filePath = null
    ) {
        $this->date = $timezone->date();
        $this->fileName = $this->path . 'customlogger-' . $this->date->format('y-m-d') . '.log';
        $this->logger = $logger;
        parent::__construct($filesystem, $filePath);
    }

    /**
     * Handler setURL.
     * @param $url
     */
    public function setUrl($url) {
        try {
            $this->url = BP . $this->path . $url . DIRECTORY_SEPARATOR . 'customlogger-' . $this->date->format('y-m-d') . '.log';
            return $this;
        } catch (\Exception $e) {
            $this->logger->critical('Error message', ['exception' => $e]);
        }
    }

}
