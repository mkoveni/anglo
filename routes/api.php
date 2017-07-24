<?php
use Anglo\Config\Config;

$config = $container->get(Config::class);

$app->post('/auth', [\Anglo\Http\Controllers\AuthController::class, 'postLogin']);

$app->group('/api', function(){

    $this->group('/users', function(){
        $this->post('/store', [\Anglo\Http\Controllers\UserController::class, 'store']);
    });

    $this->group('/roles', function (){
       $this->post('/store', [\Anglo\Http\Controllers\RoleController::class, 'store']);
    });

});
