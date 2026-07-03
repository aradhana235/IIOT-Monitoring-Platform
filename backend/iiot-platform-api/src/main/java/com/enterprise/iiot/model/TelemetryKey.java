package com.enterprise.iiot.model;

import static org.springframework.data.cassandra.core.cql.PrimaryKeyType.CLUSTERED;
import static org.springframework.data.cassandra.core.cql.PrimaryKeyType.PARTITIONED;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;

@PrimaryKeyClass
public class TelemetryKey implements Serializable {

    @PrimaryKeyColumn(name = "device_id", type = PARTITIONED)
    private UUID deviceId;

    @PrimaryKeyColumn(name = "ts", ordinal = 0, type = CLUSTERED)
    private Instant ts;

    public UUID getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(UUID deviceId) {
        this.deviceId = deviceId;
    }

    public Instant getTs() {
        return ts;
    }

    public void setTs(Instant ts) {
        this.ts = ts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TelemetryKey)) return false;
        TelemetryKey that = (TelemetryKey) o;
        return Objects.equals(deviceId, that.deviceId)
                && Objects.equals(ts, that.ts);
    }

    @Override
    public int hashCode() {
        return Objects.hash(deviceId, ts);
    }
}