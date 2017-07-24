<?php

namespace Anglo\Auth;

use Anglo\Storage\Session;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;

class Auth
{
    protected $http;
    protected $session;
    public function __construct(Client $client, Session $session)
    {
        $this->http = $client;
        $this->session = $session;
    }

    public function attempt($email, $password)
    {
        $api_response = $this->http->post('http://www.survey.dev/api/login',[
            'body'=> json_encode([
                'email' => $email,
                'password'=>$password
            ])
        ]);

        $contents = json_decode($api_response->getBody()->getContents(),true);

        $this->session->set('auth_token', $contents['data']['access_token']);
        $this->session->set('user', $contents['data']['user']['id']);

        return $this->session->has('auth_token');
    }

    public function check()
    {
        return $this->session->has('user');
    }

    public function user()
    {
        try
        {
            $api_response =  $this->http->get('http://www.survey.dev/api/user');

            $results = json_decode($api_response->getBody()->getContents(), true);

            $user = $results['data']['user'];

            return $user;
        }
        catch (ClientException $e)
        {
            $this->session->destroy('user');
        }
        catch (ConnectException $c)
        {

        }

        return null;



    }
}