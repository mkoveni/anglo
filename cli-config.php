<?php

use Doctrine\ORM\Tools\Console\ConsoleRunner;
use Doctrine\ORM\EntityManager;

// replace with file to your own project bootstrap
require_once 'bootstrap/app.php';

// replace with mechanism to retrieve EntityManager in your app

$em = $app->getContainer()->get(EntityManager::class);

return ConsoleRunner::createHelperSet($em);