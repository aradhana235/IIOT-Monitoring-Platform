package com.enterprise.iiot.mqtt;

import com.enterprise.iiot.model.Telemetry;
import com.enterprise.iiot.model.TelemetryKey;
import com.enterprise.iiot.repository.TelemetryRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
public class MqttSubscriber {

    @Value("${mqtt.broker}")
    private String broker;

    @Value("${mqtt.topic}")
    private String topic;

    @Autowired
    private TelemetryRepository telemetryRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void connect() {

        try {

            System.out.println("================================");
            System.out.println("Connecting to MQTT Broker...");
            System.out.println("Broker : " + broker);
            System.out.println("Topic  : " + topic);
            System.out.println("================================");

            MqttClient client = new MqttClient(
                    broker,
                    UUID.randomUUID().toString()
            );

            MqttConnectOptions options = new MqttConnectOptions();
            options.setAutomaticReconnect(true);
            options.setCleanSession(true);

            client.connect(options);

            System.out.println("MQTT Connected Successfully");

            client.subscribe(topic, (receivedTopic, message) -> {

                System.out.println("================================");
                System.out.println("***** CALLBACK TRIGGERED *****");
                System.out.println("Topic : " + receivedTopic);

                String payload = new String(
                        message.getPayload(),
                        StandardCharsets.UTF_8
                );

                System.out.println("Payload : " + payload);

                try {

                    JsonNode root = objectMapper.readTree(payload);

                    // -------------------------
                    // Multiple JSON Objects
                    // -------------------------
                    if (root.isArray()) {

                        List<Map<String, Object>> devices =
                                objectMapper.readValue(
                                        payload,
                                        new TypeReference<List<Map<String, Object>>>() {
                                        });

                        System.out.println("Total Devices Received : " + devices.size());

                        for (Map<String, Object> json : devices) {
                            saveTelemetry(json);
                        }

                    }
                    // -------------------------
                    // Single JSON Object
                    // -------------------------
                    else {

                        Map<String, Object> json =
                                objectMapper.readValue(
                                        payload,
                                        new TypeReference<Map<String, Object>>() {
                                        });

                        saveTelemetry(json);
                    }

                } catch (Exception ex) {
                    System.out.println("JSON Parse / Cassandra Save Error");
                    ex.printStackTrace();
                }

            });

            System.out.println("================================");
            System.out.println("Subscribed Successfully to : " + topic);
            System.out.println("Waiting for MQTT Messages...");
            System.out.println("================================");

        } catch (Exception e) {
            System.out.println("MQTT Connection Failed");
            e.printStackTrace();
        }
    }

    private void saveTelemetry(Map<String, Object> json) {

        try {

            Telemetry telemetry = new Telemetry();

            TelemetryKey key = new TelemetryKey();

            key.setDeviceId(
                    UUID.fromString(json.get("deviceId").toString())
            );

            key.setTs(Instant.now());

            telemetry.setKey(key);

            telemetry.setTemperature(
                    Double.parseDouble(json.get("temperature").toString())
            );

            telemetry.setHumidity(
                    Double.parseDouble(json.get("humidity").toString())
            );

            telemetryRepository.save(telemetry);

            System.out.println("--------------------------------");
            System.out.println("Telemetry Saved Successfully");
            System.out.println("Device ID   : " + key.getDeviceId());
            System.out.println("Temperature : " + telemetry.getTemperature());
            System.out.println("Humidity    : " + telemetry.getHumidity());

        } catch (Exception e) {
            System.out.println("Failed To Save Device : " + json);
            e.printStackTrace();
        }
    }
}