import React, { useEffect } from 'react';
import { Client, Message } from 'paho-mqtt';

const MqttComponent: React.FC = () => {
  useEffect(() => {
    const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
    const clientId = `client_${Math.random().toString(36).substring(7)}`;

    const client = new Client(brokerUrl, clientId);

    const messageList = document.getElementById('messageList') as HTMLUListElement;

    client.onMessageArrived = (message: Message) => {
        console.log('Message received:', message.payloadString);
        const listItem = document.createElement('li');
        listItem.textContent = `Tópico: ${message.destinationName}, Mensagem: ${message.payloadString}`;
        messageList.appendChild(listItem);
    };
      

    const connectOptions = {
        onSuccess: () => {
            console.log('Connected to MQTT Broker');
            const topic = 'BCIoffdout';
            client.subscribe(topic, { onSuccess: () => console.log('Subscribed to topic:', topic) });
        },
        useSSL: true,
    };

    client.connect(connectOptions);

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>MQTT Example</h1>
      <h2>Informações Recebidas</h2>
      <ul id="messageList"></ul>
    </div>
  );
};

export default MqttComponent;