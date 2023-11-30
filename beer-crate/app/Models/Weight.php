<?php

namespace App\Models;

use App\Exceptions\EngradoException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Exceptions\ServiceExportException;
use Illuminate\Http\Request;


class Weight extends Model
{
    use HasFactory;

    protected $table = 'data_weight';
    protected $primaryKey = 'id';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = ['weight', 'engrado_id', 'amount'];

    public static function populaSlot(Request $request)
    {
        try {
            $user_id = $request->header('user_id');

            if (empty($user_id)) {
                throw new EngradoException('Erro! Por favor, forneça os dados do usuário');
            }

            $entityDataWeight = self::where('user_id', $user_id)
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
    
            return response()->json(['mensagem' => 'Slot populado com sucesso.', 'status' => 200], 200);
        } catch (\Throwable $t) {
            throw new EngradoException('Erro ao gravar usuário!');
        }
    }
}

