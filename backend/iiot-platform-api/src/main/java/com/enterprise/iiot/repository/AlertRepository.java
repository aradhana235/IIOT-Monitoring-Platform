package com.enterprise.iiot.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.enterprise.iiot.model.Alert;
import com.enterprise.iiot.model.AlertKey;

public interface AlertRepository extends CassandraRepository<Alert, AlertKey> {

    List<Alert> findByKeyCustomerIdAndKeyAlertDate(UUID customerId, LocalDate alertDate);
}