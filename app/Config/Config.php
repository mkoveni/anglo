<?php

namespace Anglo\Config;

use Anglo\Config\Contracts\ParserInterface;

class Config
{
    protected $parser;
    protected $config = [];

    public function __construct(ParserInterface $parser)
    {
        $this->setParser($parser);
    }

    public function parse($file)
    {
        $this->config = $this->parser->parse($file);
    }

    public function get($key, $default = null)
    {
        $config = $this->config;

        foreach(explode('.', $key) as $index)
        {
            if(isset($config[$index]))
            {
                $config = $config[$index];
            }
            else
            {
                $config = $default;
                continue;
            }
        }

        return $config;
    }

    public function setParser(ParserInterface $parser)
    {
        $this->parser = $parser;
    }
}