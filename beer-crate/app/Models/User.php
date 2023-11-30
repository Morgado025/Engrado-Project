<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Exceptions\EngradoException;
use App\Http\Controllers\MqttController;

class User extends Model
{
    use HasFactory;

    protected $table = 'users';
    protected $primaryKey = 'id';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = ['email', 'password'];

    public static function cadastrarUsuario(Request $request)
    {
        try {
            $email = $request->input('email');
            $password = $request->input('password');

            if (empty($email) || empty($password)) {
                throw new EngradoException('Por favor, forneça email e senha');
            }

            $entityUsuario = self::create([
                'email' => $email, 
                'password' => $password, 
            ]);

            return response()->json(['mensagem' => 'Usuário gravado com sucesso.', 'status' => 200], 200);
        } catch (\Throwable $t) {
            throw new EngradoException('Erro ao gravar usuário!');
        }
    }

    public static function loginUsuario(Request $request)
    {
        try {
            $email = $request->input('email');
            $password = $request->input('password');

            if (empty($email) || empty($password)) {
                throw new EngradoException('Por favor, forneça email e senha');
            }

            $entityLogin = self::where('email', $email)
                ->where('password', $password) 
                ->get(['id'])
                ->toArray();

            if (!empty($entityLogin)) {
                $user_id = $entityLogin[0]['id'];

                $mqttController = new MqttController();
                $mqttController->leituraScriptMQTT($user_id);

                return response()->json([
                    'mensagem' => 'Login realizado com sucesso!', 
                    'status' => 200, 
                    'user_id' => $user_id], 200);
            } else {
                return response()->json([
                    'mensagem' => 'Email ou senha inválidos!', 
                    'status' => 400], 400);
            }

        } catch (\Throwable $t) {
            throw new EngradoException('Erro ao fazer login: ' . $t->getMessage());
        }
    }
}
