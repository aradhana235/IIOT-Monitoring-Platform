package com.enterprise.iiot.model;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("trap_problem_stats")
public class TrapProblemStats {

    @PrimaryKey
    private TrapProblemStatsKey key;

    @Column("problem_count")
    private int problemCount;

    public TrapProblemStatsKey getKey() {
        return key;
    }

    public void setKey(TrapProblemStatsKey key) {
        this.key = key;
    }

    public int getProblemCount() {
        return problemCount;
    }

    public void setProblemCount(int problemCount) {
        this.problemCount = problemCount;
    }
}