<?php

namespace Anglo\Http\Controllers;

use Anglo\Auth\Auth;
use Anglo\Storage\Session;
use Doctrine\ORM\EntityManager;
use GuzzleHttp\Client;
use Psr\Container\ContainerInterface;
use Slim\Router;
use Slim\Views\Twig;

class Controller
{
    protected $view;
    protected $entityManager;
    protected $session;
    protected $http;
    protected $router;
    protected $auth;
    protected $container;
    
    public function __construct(Twig $view,
                                EntityManager $em,
                                Session $session,
                                Client $http,
                                Router $router,
                                Auth $auth,
                                ContainerInterface $c)
    {
        $this->entityManager = $em;
        $this->session = $session;
        $this->http = $http;
        $this->router = $router;
        $this->auth = $auth;
        $this->view = $view;
        $this->container = $c;
    }
}