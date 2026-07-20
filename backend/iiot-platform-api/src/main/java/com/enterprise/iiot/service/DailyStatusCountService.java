package com.enterprise.iiot.service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.core.CassandraTemplate;
import org.springframework.stereotype.Service;

import com.enterprise.iiot.model.DailyStatusCount;
import com.enterprise.iiot.repository.DailyStatusCountRepository;

@Service
public class DailyStatusCountService {

    private final DailyStatusCountRepository repository;
    private final CassandraTemplate cassandraTemplate;

    public DailyStatusCountService(
            DailyStatusCountRepository repository,
            CassandraTemplate cassandraTemplate) {
        this.repository = repository;
        this.cassandraTemplate = cassandraTemplate;
    }

    public void incrementStatusCount(UUID customerId, LocalDate statusDate, String status) {
        String cql = "UPDATE daily_status_counts SET count_value = count_value + 1 " +
                     "WHERE customer_id = ? AND status_date = ? AND status = ?";

        cassandraTemplate.getCqlOperations().execute(cql, customerId, statusDate, status);
    }

    public List<DailyStatusCount> getStatusCounts(UUID customerId, LocalDate statusDate) {
        return repository.findByKeyCustomerIdAndKeyStatusDate(customerId, statusDate);
    }
}