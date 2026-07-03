package com.enterprise.iiot.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.enterprise.iiot.model.Telemetry;
import com.enterprise.iiot.repository.TelemetryRepository;

@Service
public class TelemetryService {

    private final TelemetryRepository repository;

    public TelemetryService(TelemetryRepository repository) {
        this.repository = repository;
    }

    public Telemetry save(Telemetry telemetry) {
        return repository.save(telemetry);
    }

    public List<Telemetry> getByDevice(UUID deviceId) {
        return repository.findByKeyDeviceId(deviceId);
    }
}