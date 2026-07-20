package com.enterprise.iiot.model;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("alert_trend_monthly")
public class AlertTrendMonthly {

    @PrimaryKey
    private AlertTrendMonthlyKey key;

    @Column("alert_count")
    private long alertCount;

    public AlertTrendMonthlyKey getKey() {
        return key;
    }

    public void setKey(AlertTrendMonthlyKey key) {
        this.key = key;
    }

    public long getAlertCount() {
        return alertCount;
    }

    public void setAlertCount(long alertCount) {
        this.alertCount = alertCount;
    }
}