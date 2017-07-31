<?php
/**
 * Created by PhpStorm.
 * @author Rivalani Simon Hlengani
 * @since 2017/07/23
 * Time: 11:57 PM
 */

namespace Anglo\Http\Controllers;

use Psr\Http\Message\ResponseInterface as Response;

class ReportingController extends Controller
{
    public function getMaps(Response $response)
    {
        return $this->view->render($response, 'maps.twig');
    }

    public function error()
    {
        throw new \Exception('Could not connect');
    }

    public function getGraphs(Response $response)
    {
        return $this->view->render($response, 'graphs/graphs.twig');
    }
}