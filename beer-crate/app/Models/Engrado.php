<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Exceptions\EngradoException;

class Engrado extends Model
{
    use HasFactory;

    protected $table = 'engrado_device';
    protected $primaryKey = 'id';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = ['engrado_name', 'environment', 'user_id'];

    public static function gravarNome(Request $request)
    {
        try {
            $nome_engrado = $request->input('engrado_name');
            $user_id = $request->header('User_id');
            // $ambiente_engrado = $request->input('environment');

            if (empty($nome_engrado)) {
                throw new EngradoException(
                    'Por favor, forneça o nome do engrado.'
                );
            } 
            
            // else if (empty($ambiente_engrado)) {
            //     throw new EngradoException(
            //         'Por favor, forneça o ambiente'. 
            //         ' em que está seu engrado.'
            //     );
            // } 
            
            else if (empty($user_id)) {
                throw new EngradoException('Por favor, informe o id');
            }

            $engrado_device = self::create([
                'engrado_name' => $nome_engrado, 
                'user_id' => $user_id, 
                // 'environment' => $ambiente_engrado, 
            ]);

            return response()->json([
                'mensagem' => 'Nome gravado com sucesso.', 
                'json' => $engrado_device, 
                'status' => 200
            ]);
        } catch (\Throwable $t) {
            die($t->getMessage());
            throw new EngradoException('Erro ao gravar nome');
        }
    }

    public static function consultarEngrado(Request $request)
    {
        try {
            $user_id = $request->header('user_id');

            if (empty($user_id)) {
                throw new EngradoException('Erro! Por favor, forneça os dados do usuário');
            }

            $entityEngrado = self::where('user_id', $user_id)
                ->get(['engrado_name', 'id'])
                ->toArray();

            if (!empty($entityEngrado)) {
                return response()->json([
                    'mensagem' => 'Engrado consultado!',
                    'json' => $entityEngrado
                ]);            
            } else {
                throw new EngradoException();                
            }

        } catch (\Throwable $t) {
            throw new EngradoException('Erro ao consultar dados');
        }
    }
}
