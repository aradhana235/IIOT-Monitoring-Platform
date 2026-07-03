package com.enterprise.iiot.controller;

import com.enterprise.iiot.model.Device;
import com.enterprise.iiot.service.DeviceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    // Create Device
    @PostMapping
    public Device create(@RequestBody Device device) {
        return deviceService.save(device);
    }

    // Get All Devices
    @GetMapping
    public List<Device> getAll() {
        return deviceService.getAll();
    }

    // Get Device By Id
    @GetMapping("/{id}")
    public Device getById(@PathVariable UUID id) {
        return deviceService.getById(id);
    }

    // Delete Device
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        deviceService.delete(id);
    }
}