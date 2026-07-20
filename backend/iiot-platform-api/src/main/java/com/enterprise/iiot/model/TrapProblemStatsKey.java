package com.enterprise.iiot.model;

import static org.springframework.data.cassandra.core.cql.PrimaryKeyType.CLUSTERED;
import static org.springframework.data.cassandra.core.cql.PrimaryKeyType.PARTITIONED;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;

@PrimaryKeyClass
public class TrapProblemStatsKey implements Serializable {

    @PrimaryKeyColumn(name = "customer_id", ordinal = 0, type = PARTITIONED)
    private UUID customerId;

    @PrimaryKeyColumn(name = "stat_date", ordinal = 1, type = PARTITIONED)
    private LocalDate statDate;

    @PrimaryKeyColumn(name = "sensor_id", ordinal = 0, type = CLUSTERED)
    private String sensorId;

    public UUID getCustomerId() {
        return customerId;
    }

    public void setCustomerId(UUID customerId) {
        this.customerId = customerId;
    }

    public LocalDate getStatDate() {
        return statDate;
    }

    public void setStatDate(LocalDate statDate) {
        this.statDate = statDate;
    }

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TrapProblemStatsKey)) return false;
        TrapProblemStatsKey that = (TrapProblemStatsKey) o;
        return Objects.equals(customerId, that.customerId)
                && Objects.equals(statDate, that.statDate)
                && Objects.equals(sensorId, that.sensorId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerId, statDate, sensorId);
    }
}