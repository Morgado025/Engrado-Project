#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "HX711.h"

#define CELULA_DT  21
#define CELULA_SCK  19

float fator_calib = -10000;
const char *ssid = "*****";
const char *password = "*****";

const char *mqtt_broker = "broker.emqx.io";
const char *topic = "BCIoffdout";
const char *mqtt_username = "offdout";
const char *mqtt_password = "off";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);
HX711 escala;

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi..");
    }
    Serial.println("Connected to the Wi-Fi network");

    escala.begin(CELULA_DT, CELULA_SCK);
    escala.set_scale(fator_calib); 
    escala.tare(); 

    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);
    while (!client.connected()) {
        String client_id = "esp32-client-";
        client_id += String(WiFi.macAddress());
        Serial.printf("The client %s connects to the public MQTT broker\n", client_id.c_str());
        if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
            Serial.println("Public EMQX MQTT broker connected");
        } else {
            Serial.print("failed with state ");
            Serial.print(client.state());
            delay(2000);
        }
    }
    StaticJsonDocument<200> jsonDocument;
    jsonDocument["connection"] = true;
    String jsonString;
    serializeJson(jsonDocument, jsonString);
    client.publish(topic, jsonString.c_str());
    client.subscribe(topic);
}

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

unsigned long lastPublishTime = 0;
const unsigned long publishInterval = 1 * 60 * 1000;

void loop() {
    client.loop();

    unsigned long currentMillis = millis();
    if (currentMillis - lastPublishTime >= publishInterval) {
        lastPublishTime = currentMillis;
        StaticJsonDocument<200> jsonDocumentTwo;
        jsonDocumentTwo["leitura"] = escala.get_units(10);
        String jsonStringTwo;
        serializeJson(jsonDocumentTwo, jsonStringTwo);
        client.publish(topic, jsonStringTwo.c_str());
        Serial.println("Message sent");
    }
    delay(1000);
}
