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
public class DailyStatusCountKey implements Serializable {

    @PrimaryKeyColumn(name = "customer_id", ordinal = 0, type = PARTITIONED)
    private UUID customerId;

    @PrimaryKeyColumn(name = "status_date", ordinal = 1, type = PARTITIONED)
    private LocalDate statusDate;

    @PrimaryKeyColumn(name = "status", ordinal = 0, type = CLUSTERED)
    private String status;

    public UUID getCustomerId() {
        return customerId;
    }

    public void setCustomerId(UUID customerId) {
        this.customerId = customerId;
    }

    public LocalDate getStatusDate() {
        return statusDate;
    }

    public void setStatusDate(LocalDate statusDate) {
        this.statusDate = statusDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DailyStatusCountKey)) return false;
        DailyStatusCountKey that = (DailyStatusCountKey) o;
        return Objects.equals(customerId, that.customerId)
                && Objects.equals(statusDate, that.statusDate)
                && Objects.equals(status, that.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerId, statusDate, status);
    }
}