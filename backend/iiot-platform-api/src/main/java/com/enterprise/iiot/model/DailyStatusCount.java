package com.enterprise.iiot.model;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("daily_status_counts")
public class DailyStatusCount {

    @PrimaryKey
    private DailyStatusCountKey key;

    @Column("count_value")
    private long countValue;

    public DailyStatusCountKey getKey() {
        return key;
    }

    public void setKey(DailyStatusCountKey key) {
        this.key = key;
    }

    public long getCountValue() {
        return countValue;
    }

    public void setCountValue(long countValue) {
        this.countValue = countValue;
    }
}