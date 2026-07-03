package com.enterprise.iiot.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.enterprise.iiot.model.Telemetry;
import com.enterprise.iiot.model.TelemetryKey;

public interface TelemetryRepository
        extends CassandraRepository<Telemetry, TelemetryKey> {

    List<Telemetry> findByKeyDeviceId(UUID deviceId);

}