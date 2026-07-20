package com.enterprise.iiot.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.core.CassandraTemplate;
import org.springframework.stereotype.Service;

import com.enterprise.iiot.model.AlertTrendMonthly;
import com.enterprise.iiot.repository.AlertTrendMonthlyRepository;

@Service
public class AlertTrendMonthlyService {

    private final AlertTrendMonthlyRepository repository;
    private final CassandraTemplate cassandraTemplate;

    public AlertTrendMonthlyService(
            AlertTrendMonthlyRepository repository,
            CassandraTemplate cassandraTemplate) {
        this.repository = repository;
        this.cassandraTemplate = cassandraTemplate;
    }

    public void incrementMonthlyAlert(UUID customerId, int year, int month) {
        String cql = "UPDATE alert_trend_monthly SET alert_count = alert_count + 1 " +
                     "WHERE customer_id = ? AND year = ? AND month = ?";

        cassandraTemplate.getCqlOperations().execute(cql, customerId, year, month);
    }

    public List<AlertTrendMonthly> getYearlyTrend(UUID customerId, int year) {
        return repository.findByKeyCustomerIdAndKeyYear(customerId, year);
    }
}