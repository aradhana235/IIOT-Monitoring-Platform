package com.enterprise.iiot.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.*;

import com.enterprise.iiot.model.SensorStatusCount;
import com.enterprise.iiot.service.SensorStatusCountService;

@RestController
@RequestMapping("/api/sensor-status-counts")
public class SensorStatusCountController {

    private final SensorStatusCountService service;

    public SensorStatusCountController(SensorStatusCountService service) {
        this.service = service;
    }

    @PostMapping("/increment")
    public String increment(
            @RequestParam UUID customerId,
            @RequestParam String sensorId,
            @RequestParam(required = false) String date,
            @RequestParam String status) {

        LocalDate statusDate = (date != null) ? LocalDate.parse(date) : LocalDate.now();
        service.incrementSensorStatusCount(customerId, sensorId, statusDate, status);
        return "Incremented " + status + " for sensor " + sensorId;
    }

    @GetMapping
    public List<SensorStatusCount> getStats(
            @RequestParam UUID customerId,
            @RequestParam String sensorId,
            @RequestParam(required = false) String date) {

        LocalDate statusDate = (date != null) ? LocalDate.parse(date) : LocalDate.now();
        return service.getSensorStatusCounts(customerId, sensorId, statusDate);
    }
}