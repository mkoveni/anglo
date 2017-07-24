<?php

namespace Anglo\Config;

use Anglo\Config\Contracts\ParserInterface;

class ArrayParser implements ParserInterface
{
    public function parse($file)
    {
        if(!is_string($file))
            throw new IllegalArgumentException("Supplied paramater must be a string");
        
        if(!file_exists($file))
            throw new IllegalArgumentException('File does not exist');

        $pos = strrpos($file, '.');

        $ext = substr($file, $pos+1);
    

        if($ext !== 'php')
            throw new IllegalArgumentException('Unsupported file');

        $config_data = require $file;

        return $config_data;
    }
}