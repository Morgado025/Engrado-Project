<?php

namespace App\Http\Controllers;

class MqttController extends Controller
{
    public function leituraScriptMQTT()
    {
        $caminho_arquivo = '/home/morgado/Documents/Projects/beer-crate/script/log.txt';

        if (file_exists($caminho_arquivo)) {
            $conteudo = file_get_contents($caminho_arquivo);

            $mensagens = explode("\n", $conteudo);

            foreach ($mensagens as $mensagem) {

                $json_engrado = explode(":", $mensagem, 2);
                
                if (count($json_engrado) === 2) {
                    $mensagem_json = trim($json_engrado[1]);

                    $log_mensagens_json[] = $mensagem_json;
                }
            }

            return view('mqtt_view', compact('log_mensagens_json'));
        }

        return view('mqtt_view', ['mensagem' => []]);   
    }
}
