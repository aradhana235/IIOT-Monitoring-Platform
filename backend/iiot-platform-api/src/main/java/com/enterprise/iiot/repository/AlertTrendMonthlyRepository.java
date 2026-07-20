package com.enterprise.iiot.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.enterprise.iiot.model.AlertTrendMonthly;
import com.enterprise.iiot.model.AlertTrendMonthlyKey;

public interface AlertTrendMonthlyRepository
        extends CassandraRepository<AlertTrendMonthly, AlertTrendMonthlyKey> {

    List<AlertTrendMonthly> findByKeyCustomerIdAndKeyYear(UUID customerId, int year);
}