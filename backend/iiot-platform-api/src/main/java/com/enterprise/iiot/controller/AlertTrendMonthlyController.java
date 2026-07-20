package com.enterprise.iiot.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.*;

import com.enterprise.iiot.model.AlertTrendMonthly;
import com.enterprise.iiot.service.AlertTrendMonthlyService;

@RestController
@RequestMapping("/api/alert-trend")
public class AlertTrendMonthlyController {

    private final AlertTrendMonthlyService service;

    public AlertTrendMonthlyController(AlertTrendMonthlyService service) {
        this.service = service;
    }

    @PostMapping("/increment")
    public String increment(
            @RequestParam UUID customerId,
            @RequestParam int year,
            @RequestParam int month) {

        service.incrementMonthlyAlert(customerId, year, month);
        return "Incremented alert trend for " + year + "-" + month;
    }

    @GetMapping
    public List<AlertTrendMonthly> getYearlyTrend(
            @RequestParam UUID customerId,
            @RequestParam int year) {

        return service.getYearlyTrend(customerId, year);
    }
}