<?php

namespace Anglo\Http\Middleware;

class TokenMiddleware extends Middleware
{
    public function __invoke($request, $response, $next)
    {
        return $next($request, $response);
    }

    public function authenticate()
    {
        $this->session->get('user');
    }
}