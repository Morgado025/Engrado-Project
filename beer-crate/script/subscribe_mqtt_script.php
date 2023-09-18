<?php
require '../vendor/autoload.php'; 

use \PhpMqtt\Client\MqttClient;
use \PhpMqtt\Client\ConnectionSettings;

$mqtt_broker = 'broker.emqx.io';
$mqtt_port = 1883;
$username = 'emqx_user';
$password = 'public';
$clientId = 'client_' . uniqid();

$conexao = (new ConnectionSettings)
    ->setUsername($username)
    ->setPassword($password)
    ->setKeepAliveInterval(60)
    ->setLastWillTopic('BCIoffdout')
    ->setLastWillMessage('Fim do Script')
    ->setLastWillQualityOfService(1);

$mqtt = new MqttClient($mqtt_broker, $mqtt_port, $clientId, MqttClient::MQTT_3_1_1);

echo "--------------------------------";
echo "Script MQTT Subscribe Iniciado!";
echo "--------------------------------\n";

$mqtt->connect($conexao, false);
echo "--------------------------------";
echo "Conexão com Broker estabelicida com sucesso!";
echo "--------------------------------\n";

$mqtt->subscribe('BCIoffdout', function ($topico, $messagem) {
    $mensagem_log = "Mensagem recebida do Tópico [$topico]: $messagem\n";
    file_put_contents('log.txt', $mensagem_log, FILE_APPEND);

    printf($mensagem_log);
}, 0);

$mqtt->loop(true, 60);

echo "--------------------------------";
echo "Script Finalizado!";
echo "--------------------------------\n";
