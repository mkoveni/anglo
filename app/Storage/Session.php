<?php

namespace Anglo\Storage;

class Session
{
    public function has($key)
    {
        return isset($_SESSION[$key]);
    }

    public function get($key)
    {
        return $this->has($key) ? $_SESSION[$key] : null;
    }

    public function set($key, $value)
    {
        $_SESSION[$key] = $value;
    }

    public function destroy($key)
    {
        if($this->has($key))
            unset($_SESSION[$key]);
    }

    public function flash($key)
    {
        $message = $this->get($key);
        $this->destroy($key);
        return $message;
    }

}