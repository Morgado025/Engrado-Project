<?php

namespace App\Http\Controllers;

use App\Exceptions\EngradoException;
use App\Models\Engrado;
use Illuminate\Http\Request;

class EngradoController extends Controller
{
    public function gravarNome(Request $request)
    {
        try {
            if (!$request->hasHeader('name')) {
                throw new EngradoException('Erro! Por favor, forneça um nome no cabeçalho da requisição.');
            }

            $nome = $request->header('nome');

            Engrado::gravarNome($request);

            return response()->json(['mensagem' => 'Nome gravado com sucesso.']);
        } catch (\Throwable $t) {
            return response()->json(['erro' => 'Erro ao gravar nome: ' . $t->getMessage()], 500);
        }
    }
}
