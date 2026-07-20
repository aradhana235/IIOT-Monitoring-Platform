package com.enterprise.iiot.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.enterprise.iiot.model.SensorStatusCount;
import com.enterprise.iiot.model.SensorStatusCountKey;

public interface SensorStatusCountRepository
        extends CassandraRepository<SensorStatusCount, SensorStatusCountKey> {

    List<SensorStatusCount> findByKeyCustomerIdAndKeySensorIdAndKeyStatusDate(
            UUID customerId, String sensorId, LocalDate statusDate);
}