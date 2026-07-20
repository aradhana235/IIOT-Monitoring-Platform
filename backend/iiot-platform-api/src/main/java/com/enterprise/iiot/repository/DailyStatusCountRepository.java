package com.enterprise.iiot.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.enterprise.iiot.model.DailyStatusCount;
import com.enterprise.iiot.model.DailyStatusCountKey;

public interface DailyStatusCountRepository
        extends CassandraRepository<DailyStatusCount, DailyStatusCountKey> {

    List<DailyStatusCount> findByKeyCustomerIdAndKeyStatusDate(UUID customerId, LocalDate statusDate);
}