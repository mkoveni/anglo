<?php


namespace Anglo\Http\Middleware;


class ErrorMiddleware extends Middleware
{
    public function __invoke($request,$response, $next)
    {
        if($this->session->has('errors'))
        {
            $this->view->getEnvironment()->addGlobal('errors', $this->session->get('errors'));
            $this->session->destroy('errors');
        }
        return $next($request,$response);
    }
}