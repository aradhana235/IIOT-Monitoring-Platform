package com.enterprise.iiot.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.*;

import com.enterprise.iiot.model.DailyStatusCount;
import com.enterprise.iiot.service.DailyStatusCountService;

@RestController
@RequestMapping("/api/status-counts")
public class DailyStatusCountController {

    private final DailyStatusCountService service;

    public DailyStatusCountController(DailyStatusCountService service) {
        this.service = service;
    }

    @PostMapping("/increment")
    public String increment(
            @RequestParam UUID customerId,
            @RequestParam(required = false) String date,
            @RequestParam String status) {

        LocalDate statusDate = (date != null) ? LocalDate.parse(date) : LocalDate.now();
        service.incrementStatusCount(customerId, statusDate, status);
        return "Incremented status count for " + status;
    }

    @GetMapping
    public List<DailyStatusCount> getStatusCounts(
            @RequestParam UUID customerId,
            @RequestParam(required = false) String date) {

        LocalDate statusDate = (date != null) ? LocalDate.parse(date) : LocalDate.now();
        return service.getStatusCounts(customerId, statusDate);
    }
}