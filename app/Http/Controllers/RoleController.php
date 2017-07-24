<?php


namespace Anglo\Http\Controllers;

use Anglo\Models\Role;
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class RoleController extends Controller
{
    public function store(Request $request, Response $response)
    {
        $role = new Role();
        $role->setName('Admin');

        $this->entityManager->persist($role);
        $this->entityManager->flush();

        return $response->withJson([
            'data'=> $role
        ]);
    }
}