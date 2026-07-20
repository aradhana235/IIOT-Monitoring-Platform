package com.enterprise.iiot.model;

import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("alerts")
public class Alert {

    @PrimaryKey
    private AlertKey key;

    @Column("device_id")
    private UUID deviceId;

    @Column("device_name")
    private String deviceName;

    @Column("severity")
    private String severity;

    @Column("message")
    private String message;

    public AlertKey getKey() {
        return key;
    }

    public void setKey(AlertKey key) {
        this.key = key;
    }

    public UUID getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(UUID deviceId) {
        this.deviceId = deviceId;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}