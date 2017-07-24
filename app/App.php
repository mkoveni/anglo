<?php

namespace Anglo;

use DI\Bridge\Slim\App as Bridge;
use DI\ContainerBuilder;

class App extends Bridge
{
    protected function configureContainer(ContainerBuilder $builder)
    {
        $builder->addDefinitions([
            'settings.displayErrorDetails' => true
        ]);
        
        $builder->addDefinitions(__DIR__ .'/container.php');
    }
}