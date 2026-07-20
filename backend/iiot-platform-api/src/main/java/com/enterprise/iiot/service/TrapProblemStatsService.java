package com.enterprise.iiot.service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.enterprise.iiot.dto.TrapProblemStatsRequest;
import com.enterprise.iiot.model.TrapProblemStats;
import com.enterprise.iiot.model.TrapProblemStatsKey;
import com.enterprise.iiot.repository.TrapProblemStatsRepository;

@Service
public class TrapProblemStatsService {

    private final TrapProblemStatsRepository repository;

    public TrapProblemStatsService(TrapProblemStatsRepository repository) {
        this.repository = repository;
    }

    public TrapProblemStats save(TrapProblemStatsRequest request) {
        TrapProblemStatsKey key = new TrapProblemStatsKey();
        key.setCustomerId(UUID.fromString(request.getCustomerId()));
        key.setStatDate(LocalDate.now());
        key.setSensorId(request.getSensorId());

        TrapProblemStats stats = new TrapProblemStats();
        stats.setKey(key);
        stats.setProblemCount(request.getProblemCount());

        return repository.save(stats);
    }

    public List<TrapProblemStats> getByCustomerAndDate(UUID customerId, LocalDate date) {
        return repository.findByKeyCustomerIdAndKeyStatDate(customerId, date);
    }
}