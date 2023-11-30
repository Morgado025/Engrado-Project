<?php

namespace App\Http\Controllers;

use App\Models\WeightScript;

class MqttController extends Controller
{
    public function leituraScriptMQTT()
    {
        $caminho_arquivo = '/home/nbtlc-0549/beer-crate/beer-crate/script/log.txt';

        if (file_exists($caminho_arquivo)) {
            $conteudo = file_get_contents($caminho_arquivo);

            $mensagens = explode("\n", $conteudo);

            $log_mensagens_json = [];

            foreach ($mensagens as $mensagem) {
                $json_engrado = explode(":", $mensagem, 2);

                if (count($json_engrado) === 2) {
                    $mensagem_json = trim($json_engrado[1]);
                    $decoded_mensagem = json_decode($mensagem_json, true);

                    if (isset($decoded_mensagem['weight'])) {
                        $log_mensagens_json[] = $decoded_mensagem;
                    }
                }
            }

            foreach ($log_mensagens_json as $mensagem) {
                $weightValue = $mensagem['weight'];
            
                $existingRecord = WeightScript::where('json_weight', $weightValue)->first();
            
                if ($existingRecord) {
                    $existingRecord->update(['json_weight' => $weightValue]);
                } else {
                    WeightScript::gravarScriptDados(['json_weight' => $weightValue]); 
                }
            }
            
            return response()->json(['mensagem' => 'Dados salvos com sucesso no banco de dados.', 'status' => 200], 200);
        }

        return response()->json(['mensagem' => 'Arquivo não encontrado.', 'status' => 400], 400);
    }
}
