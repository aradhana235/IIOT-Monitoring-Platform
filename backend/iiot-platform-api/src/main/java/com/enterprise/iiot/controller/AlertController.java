package com.enterprise.iiot.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.*;

import com.enterprise.iiot.dto.AlertRequest;
import com.enterprise.iiot.model.Alert;
import com.enterprise.iiot.service.AlertService;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final AlertService service;

    public AlertController(AlertService service) {
        this.service = service;
    }

    @PostMapping
    public Alert save(@RequestBody AlertRequest request) {
        return service.save(request);
    }

    @GetMapping
    public List<Alert> getAlerts(
            @RequestParam UUID customerId,
            @RequestParam(required = false) String date) {

        LocalDate alertDate = (date != null) ? LocalDate.parse(date) : LocalDate.now();
        return service.getByCustomerAndDate(customerId, alertDate);
    }
}