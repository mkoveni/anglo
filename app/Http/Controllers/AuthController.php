<?php

namespace Anglo\Http\Controllers;

use GuzzleHttp\Exception\ClientException;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;


class AuthController extends Controller
{
    public function getLogin(Request $request, Response $response)
    {
        $this->view->render($response, 'auth/login.twig');
    }

    public function postLogin(\Slim\Http\Request $request, Response $response)
    {
        $email = $request->getParam('email');
        $password = $request->getParam('password');

        try {

            if ($this->auth->attempt($email, $password)) {
                return $response->withRedirect($this->router->pathFor('dashboard'));

            }
        }
        catch (ClientException $c)
        {
            $code = $c->getResponse()->getStatusCode();

            if($code === 422)
            {
                $data = json_decode($c->getResponse()->getBody()->getContents(), true);

                $this->session->set('errors', $data['errors']);
                $this->session->set('danger', $data['errors']['root']);
                return $response->withRedirect($this->router->pathFor('auth.login'));
            }
        }

    }
}