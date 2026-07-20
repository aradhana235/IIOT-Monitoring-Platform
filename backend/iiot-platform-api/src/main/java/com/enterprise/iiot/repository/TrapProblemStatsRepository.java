package com.enterprise.iiot.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.enterprise.iiot.model.TrapProblemStats;
import com.enterprise.iiot.model.TrapProblemStatsKey;

public interface TrapProblemStatsRepository
        extends CassandraRepository<TrapProblemStats, TrapProblemStatsKey> {

    List<TrapProblemStats> findByKeyCustomerIdAndKeyStatDate(UUID customerId, LocalDate statDate);
}