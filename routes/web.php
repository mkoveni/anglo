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
$app->get('/reporting/overview/graphs', [\Anglo\Http\Controllers\ReportingController::class, 'getGraphs'])->setName('graphs');
$app->get('/reporting/overview', [\Anglo\Http\Controllers\ReportingController::class,  'getOverview'])->setName('overview');
$app->get('/reporting/summary', [\Anglo\Http\Controllers\ReportingController::class,  'getOverall']);

