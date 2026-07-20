package com.enterprise.iiot.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.*;

import com.enterprise.iiot.dto.TrapProblemStatsRequest;
import com.enterprise.iiot.model.TrapProblemStats;
import com.enterprise.iiot.service.TrapProblemStatsService;

@RestController
@RequestMapping("/api/trap-stats")
public class TrapProblemStatsController {

    private final TrapProblemStatsService service;

    public TrapProblemStatsController(TrapProblemStatsService service) {
        this.service = service;
    }

    @PostMapping
    public TrapProblemStats save(@RequestBody TrapProblemStatsRequest request) {
        return service.save(request);
    }

    @GetMapping
    public List<TrapProblemStats> getStats(
            @RequestParam UUID customerId,
            @RequestParam(required = false) String date) {

        LocalDate statDate = (date != null) ? LocalDate.parse(date) : LocalDate.now();
        return service.getByCustomerAndDate(customerId, statDate);
    }
}