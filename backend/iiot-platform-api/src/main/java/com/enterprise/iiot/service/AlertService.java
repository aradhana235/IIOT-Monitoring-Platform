package com.enterprise.iiot.service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.datastax.oss.driver.api.core.uuid.Uuids;
import com.enterprise.iiot.dto.AlertRequest;
import com.enterprise.iiot.model.Alert;
import com.enterprise.iiot.model.AlertKey;
import com.enterprise.iiot.repository.AlertRepository;

@Service
public class AlertService {

    private final AlertRepository repository;

    public AlertService(AlertRepository repository) {
        this.repository = repository;
    }

    public Alert save(AlertRequest request) {
        AlertKey key = new AlertKey();
        key.setCustomerId(UUID.fromString(request.getCustomerId()));
        key.setAlertDate(LocalDate.now());
        key.setTs(Instant.now());
        key.setAlertId(Uuids.timeBased());

        Alert alert = new Alert();
        alert.setKey(key);
        alert.setDeviceId(UUID.fromString(request.getDeviceId()));
        alert.setDeviceName(request.getDeviceName());
        alert.setSeverity(request.getSeverity());
        alert.setMessage(request.getMessage());

        return repository.save(alert);
    }

    public List<Alert> getByCustomerAndDate(UUID customerId, LocalDate date) {
        return repository.findByKeyCustomerIdAndKeyAlertDate(customerId, date);
    }
}