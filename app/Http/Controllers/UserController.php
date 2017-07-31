<?php
/**
 * Created by IntelliJ IDEA.
 * User: CodeThunder
 * Date: 2017/07/18
 * Time: 9:36 PM
 */

namespace Anglo\Http\Controllers;


use Anglo\Models\Roles;
use Anglo\Models\User;
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class UserController extends Controller
{
    public function store(Request $request, Response $response)
    {
        $user = new User();
        $user->setName('Rivalani Simon Mkoveni');
        $user->setEmail('mkoveni@gmail.com');
        $user->setPassword(password_hash('Simon123', PASSWORD_DEFAULT));
        $user->setRole($this->entityManager->find(Roles::class, 9));
        $user->setToken('lalala');

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $response->withJson(['data' => $user]);
    }
}