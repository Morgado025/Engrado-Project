#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "HX711.h"

#define CELULA_DT  21
#define CELULA_SCK  19

float fator_calib = -10000;

WiFiClient espClient;
PubSubClient mqttClient(espClient);
HX711 escala;

class MqttWifiConnection {
public:
    MqttWifiConnection(const char* ssid, const char* password, const char* mqttBroker, int mqttPort)
        : ssid(ssid), password(password), mqttBroker(mqttBroker), mqttPort(mqttPort) {
    }

    bool connect() {
        WiFi.begin(ssid, password);
        while (WiFi.status() != WL_CONNECTED) {
            delay(1000);
            Serial.println("Connecting to WiFi...");
        }

        escala.begin(CELULA_DT, CELULA_SCK);
        escala.set_scale(fator_calib); 
        escala.tare(); 
        
        mqttClient.setServer(mqttBroker, mqttPort);
        mqttClient.setCallback([this](char* topic, byte* payload, unsigned int length) {
            this->callback(topic, payload, length);
        });

        while (!mqttClient.connected()) {
            String clientId = "esp32-client-";
            clientId += String(WiFi.macAddress());
            Serial.printf("The client %s connects to the public MQTT broker\n", clientId.c_str());
            if (mqttClient.connect(clientId.c_str(), mqttUser, mqttPassword)) {
                Serial.println("Public EMQX MQTT broker connected");
            } else {
                Serial.print("failed with state ");
                Serial.print(mqttClient.state());
                delay(2000);
            }
        }
        StaticJsonDocument<200> jsonDocument;
        jsonDocument["connection"] = true;
        String jsonString;
        serializeJson(jsonDocument, jsonString);
        this->publish(topic, jsonString.c_str());
        this->subscribe(topic);
        return true;
    }

    void disconnect() {
        if (mqttClient.connected()) {
            mqttClient.disconnect();
        }
        WiFi.disconnect();
    }

    bool isConnected() const {
        return WiFi.status() == WL_CONNECTED && mqttClient.connected();
    }

    void publish(const char* topic, const char* message) {
        if (mqttClient.connected()) {
            mqttClient.publish(topic, message);
        }
    }

    void subscribe(const char* topic) {
        if (mqttClient.connected()) {
            mqttClient.subscribe(topic);
        }
    }

    void loop() {
        if (mqttClient.connected()) {
            mqttClient.loop();
        }
    }

private:
    const char *ssid;
    const char *password;
    const char *mqttBroker;
    const char *topic = "BCIoffdout";
    const char *mqttUser = "offdout";
    const char *mqttPassword = "off";
    const int mqttPort;


    void callback(char *topic, byte *payload, unsigned int length) {
        Serial.print("Message arrived in topic: ");
        Serial.println(topic);
        Serial.print("Message:");
        for (int i = 0; i < length; i++) {
            Serial.print((char) payload[i]);
        }
        Serial.println();
        Serial.println("-----------------------");
    }
};

MqttWifiConnection mqttWifi("*****", "*****", "broker.emqx.io", 1883);

void setup() {
    Serial.begin(115200);
    if (mqttWifi.connect()) {
        mqttWifi.subscribe("BCIoffdout");
        mqttWifi.publish("BCIoffdout", "MQTT Test Message");
        Serial.println("Connection established and MQTT messages published/subscribed.");
    } else {
        Serial.println("Failed to establish Wi-Fi/MQTT connection.");
    }
}

unsigned long lastPublishTime = 0;
const unsigned long publishInterval = 1 * 60 * 1000;

void loop() {
    mqttWifi.loop();

    unsigned long currentMillis = millis();
    if (currentMillis - lastPublishTime >= publishInterval) {
        lastPublishTime = currentMillis;
        StaticJsonDocument<200> jsonDocumentTwo;
        jsonDocumentTwo["weight"] = escala.get_units(10);
        String jsonStringTwo;
        serializeJson(jsonDocumentTwo, jsonStringTwo);
        mqttWifi.publish("BCIoffdout", jsonStringTwo.c_str());
        Serial.println("Message sent");
    }
    delay(1000);
}
