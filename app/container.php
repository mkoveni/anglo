<?php

use Anglo\Auth\Auth;
use Anglo\Storage\Session;
use DI\ContainerBuilder;
use GuzzleHttp\Client;
use Slim\Views\Twig;
use Interop\Container\ContainerInterface;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
use Anglo\Config\Config;
use Anglo\Config\ArrayParser;

return [
    Session::class => function(ContainerInterface $c)
    {
        return new Session();
    },
    Client::class => function(ContainerInterface $c)
    {
        $token = $c->get(Session::class)->get('auth_token');

        $client  = new Client([
            'headers'=> [
                'Content-Type'=>'application/json',
                'Accept' => 'application/json',
                'Authorization' => 'Bearer '.$token
            ]
        ]);

        return $client;
    },

    Auth::class => function(ContainerInterface $c)
    {
        return new  Auth($c->get(Client::class), $c->get(Session::class));
    },
    Twig::class => function(ContainerInterface $c)
    {
        $view = new Twig(__DIR__ .'/../resources/views',[
            'cache' => false
        ]);

        $view->addExtension(new \Slim\Views\TwigExtension(
            $c->get('router'),
            $c->get('request')->getUri()
        ));
        $auth = $c->get(Auth::class);

        $view->getEnvironment()->addGlobal('auth',[
            'check' => $auth->check(),
            'user' => $auth->user()
        ]);

        $view->getEnvironment()->addGlobal('session', $c->get(Session::class));

        return  $view;
    },
    Config::class => function(ContainerInterface $c)
    {
        $config = new Config(new ArrayParser);
        $config->parse(__DIR__.'/../config/config.php');

        return $config;
    },
    EntityManager::class => function(ContainerInterface $c)
    {
        $paths = [__DIR__ .'/Models'];
        $isDevMode = true;
        $config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode);

        $entityManager = EntityManager::create($c->get(Config::class)->get('doctrine'), $config);

        return $entityManager;
    }
];