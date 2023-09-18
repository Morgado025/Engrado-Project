<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MQTT Log View</title>
</head>
<body>
    <h1>MQTT Log</h1>
    <ul>
        @foreach ($log_mensagens_json as $mensagem)
            <li>{{ $mensagem }}</li>
        @endforeach
    </ul>
</body>
</html>
