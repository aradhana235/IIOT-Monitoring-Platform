package com.enterprise.iiot.model;

import static org.springframework.data.cassandra.core.cql.PrimaryKeyType.CLUSTERED;
import static org.springframework.data.cassandra.core.cql.PrimaryKeyType.PARTITIONED;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;

@PrimaryKeyClass
public class AlertTrendMonthlyKey implements Serializable {

    @PrimaryKeyColumn(name = "customer_id", type = PARTITIONED)
    private UUID customerId;

    @PrimaryKeyColumn(name = "year", ordinal = 0, type = CLUSTERED)
    private int year;

    @PrimaryKeyColumn(name = "month", ordinal = 1, type = CLUSTERED)
    private int month;

    public UUID getCustomerId() {
        return customerId;
    }

    public void setCustomerId(UUID customerId) {
        this.customerId = customerId;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AlertTrendMonthlyKey)) return false;
        AlertTrendMonthlyKey that = (AlertTrendMonthlyKey) o;
        return year == that.year
                && month == that.month
                && Objects.equals(customerId, that.customerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerId, year, month);
    }
}