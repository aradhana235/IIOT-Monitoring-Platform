package com.enterprise.iiot.service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.core.CassandraTemplate;
import org.springframework.stereotype.Service;

import com.enterprise.iiot.model.SensorStatusCount;
import com.enterprise.iiot.repository.SensorStatusCountRepository;

@Service
public class SensorStatusCountService {

    private final SensorStatusCountRepository repository;
    private final CassandraTemplate cassandraTemplate;

    public SensorStatusCountService(
            SensorStatusCountRepository repository,
            CassandraTemplate cassandraTemplate) {
        this.repository = repository;
        this.cassandraTemplate = cassandraTemplate;
    }

    public void incrementSensorStatusCount(UUID customerId, String sensorId, LocalDate date, String status) {
        String cql = "UPDATE sensor_status_counts SET count_value = count_value + 1 " +
                     "WHERE customer_id = ? AND sensor_id = ? AND status_date = ? AND status = ?";
        cassandraTemplate.getCqlOperations().execute(cql, customerId, sensorId, date, status);
    }

    public List<SensorStatusCount> getSensorStatusCounts(UUID customerId, String sensorId, LocalDate date) {
        return repository.findByKeyCustomerIdAndKeySensorIdAndKeyStatusDate(customerId, sensorId, date);
    }
}