<?php
/**
 * Created by IntelliJ IDEA.
 * User: CodeThunder
 * Date: 2017/07/18
 * Time: 9:24 PM
 */

namespace Anglo\Http\Middleware;


use Anglo\Storage\Session;
use Slim\Views\Twig;

class Middleware
{
    protected $session;
    protected $view;

    public function __construct(Twig $view, Session $session)
    {
        $this->session = $session;
        $this->view = $view;
    }
}