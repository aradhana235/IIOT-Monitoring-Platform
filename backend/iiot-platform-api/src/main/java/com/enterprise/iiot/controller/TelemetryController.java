package com.enterprise.iiot.controller;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.*;

import com.enterprise.iiot.dto.TelemetryRequest;
import com.enterprise.iiot.model.Telemetry;
import com.enterprise.iiot.model.TelemetryKey;
import com.enterprise.iiot.service.TelemetryService;

@RestController
@RequestMapping("/api/telemetry")
public class TelemetryController {

    private final TelemetryService service;

    public TelemetryController(TelemetryService service) {
        this.service = service;
    }

    @PostMapping
    public Telemetry save(@RequestBody TelemetryRequest request) {

        Telemetry telemetry = new Telemetry();

        TelemetryKey key = new TelemetryKey();
        key.setDeviceId(UUID.fromString(request.getDeviceId()));
        key.setTs(Instant.now());

        telemetry.setKey(key);
        telemetry.setTemperature(request.getTemperature());
        telemetry.setHumidity(request.getHumidity());

        return service.save(telemetry);
    }

    @GetMapping("/{deviceId}")
    public List<Telemetry> getTelemetry(@PathVariable UUID deviceId) {
        return service.getByDevice(deviceId);
    }
}