<?php

use Doctrine\ORM\EntityManager;
use Doctrine\Common\Collections\ArrayCollection;

use GuzzleHttp\Client;

$app->get('/login', [\Anglo\Http\Controllers\AuthController::class, 'getLogin'])->setName('auth.login');
$app->post('/login', [\Anglo\Http\Controllers\AuthController::class, 'postLogin']);

$app->get('/dashboard', function ($request, $response, \Slim\Views\Twig $view) {

    return $view->render($response, 'dashboard.twig');
})->setName('dashboard');

$app->get('/reporting/maps', [\Anglo\Http\Controllers\ReportingController::class, 'getMaps'])->setName('maps');

$app->get('/reporting/overview', [\Anglo\Http\Controllers\ReportingController::class, 'error'])->setName('error');

$app->get('/reporting/overview/graphs', [\Anglo\Http\Controllers\ReportingController::class, 'getGraphs'])->setName('graphs');

$app->get('/add/role', function(EntityManager $em){

});

$app->get('/test', function($request,$response,\Slim\Views\Twig $view){

    return $view->render($response, 'maps.twig');
})->setName('test');
