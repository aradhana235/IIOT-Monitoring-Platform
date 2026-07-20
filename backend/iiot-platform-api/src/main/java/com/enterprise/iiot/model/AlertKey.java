package com.enterprise.iiot.model;

import static org.springframework.data.cassandra.core.cql.PrimaryKeyType.CLUSTERED;
import static org.springframework.data.cassandra.core.cql.PrimaryKeyType.PARTITIONED;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;

@PrimaryKeyClass
public class AlertKey implements Serializable {

    @PrimaryKeyColumn(name = "customer_id", ordinal = 0, type = PARTITIONED)
    private UUID customerId;

    @PrimaryKeyColumn(name = "alert_date", ordinal = 1, type = PARTITIONED)
    private LocalDate alertDate;

    @PrimaryKeyColumn(name = "ts", ordinal = 0, type = CLUSTERED)
    private Instant ts;

    @PrimaryKeyColumn(name = "alert_id", ordinal = 1, type = CLUSTERED)
    @CassandraType(type = CassandraType.Name.TIMEUUID)
    private UUID alertId;

    public UUID getCustomerId() {
        return customerId;
    }

    public void setCustomerId(UUID customerId) {
        this.customerId = customerId;
    }

    public LocalDate getAlertDate() {
        return alertDate;
    }

    public void setAlertDate(LocalDate alertDate) {
        this.alertDate = alertDate;
    }

    public Instant getTs() {
        return ts;
    }

    public void setTs(Instant ts) {
        this.ts = ts;
    }

    public UUID getAlertId() {
        return alertId;
    }

    public void setAlertId(UUID alertId) {
        this.alertId = alertId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AlertKey)) return false;
        AlertKey that = (AlertKey) o;
        return Objects.equals(customerId, that.customerId)
                && Objects.equals(alertDate, that.alertDate)
                && Objects.equals(ts, that.ts)
                && Objects.equals(alertId, that.alertId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerId, alertDate, ts, alertId);
    }
}