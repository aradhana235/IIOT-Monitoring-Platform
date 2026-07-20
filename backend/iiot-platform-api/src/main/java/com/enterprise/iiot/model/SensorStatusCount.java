package com.enterprise.iiot.model;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("sensor_status_counts")
public class SensorStatusCount {

    @PrimaryKey
    private SensorStatusCountKey key;

    @Column("count_value")
    private long countValue;

    public SensorStatusCountKey getKey() {
        return key;
    }

    public void setKey(SensorStatusCountKey key) {
        this.key = key;
    }

    public long getCountValue() {
        return countValue;
    }

    public void setCountValue(long countValue) {
        this.countValue = countValue;
    }
}