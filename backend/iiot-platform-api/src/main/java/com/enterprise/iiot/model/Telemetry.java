package com.enterprise.iiot.model;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("telemetry")
public class Telemetry {

    @PrimaryKey
    private TelemetryKey key;

    private Double temperature;

    private Double humidity;

    public TelemetryKey getKey() {
        return key;
    }

    public void setKey(TelemetryKey key) {
        this.key = key;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getHumidity() {
        return humidity;
    }

    public void setHumidity(Double humidity) {
        this.humidity = humidity;
    }
}