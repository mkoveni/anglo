<?php
session_start();
require __DIR__ .'/../vendor/autoload.php';

use Anglo\App;
use Slim\Views\Twig;
use Anglo\Storage\Session;


$app = new App;

$container = $app->getContainer();

$app->add(new \Anglo\Http\Middleware\ErrorMiddleware($container->get(Twig::class), $container->get(Session::class)));

require __DIR__ . '/../routes/web.php';
require __DIR__ . '/../routes/api.php';



