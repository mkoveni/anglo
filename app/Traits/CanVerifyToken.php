<?php

namespace Anglo\Traits;

trait CanVerifyToken
{
    public function verifyToken($token)
    {
        return $this->token === $token;
    }
}