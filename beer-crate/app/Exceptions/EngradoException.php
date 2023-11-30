<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;

class EngradoException extends Exception
{
    protected $message = "Ops! Algo deu errado";

    public function render()
    {
        return response()->json(['erro' => $this->message, 'status' => 400], 400);
    }
}
