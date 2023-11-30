<?php

namespace App\Models;

use App\Exceptions\EngradoException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Exceptions\ServiceExportException;
use Illuminate\Http\Request;

class WeightScript extends Model
{
    protected $table = 'weight_data_script';
    protected $primaryKey = 'json_weight'; 
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = ['json_weight'];

    public static function gravarScriptDados($json)
    {
        try {
            if (empty($json)) {
                throw new EngradoException('Erro! Forneça o json.');
            }

            $entityWeightScript = self::updateOrInsert(
                ['json_weight' => $json],
                ['json_weight' => $json]
            );

            return response()->json(['mensagem' => 'Consulta dados peso script com sucesso.', 'status' => 200], 200);
        } catch (\Throwable $t) {
            throw new EngradoException('Erro ao consultar dados');
        }
    }

    public static function obterDadoMaisRecente()
    {
        $dadoMaisRecente = self::orderBy('created_at', 'desc')->first();
        
        return $dadoMaisRecente;
    }
}

