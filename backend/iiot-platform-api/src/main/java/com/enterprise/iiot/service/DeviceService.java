package com.enterprise.iiot.service;

import com.enterprise.iiot.model.Device;
import com.enterprise.iiot.repository.DeviceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;

    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    // Create Device
    public Device save(Device device) {
        return deviceRepository.save(device);
    }

    // Get All Devices
    public List<Device> getAll() {
        return deviceRepository.findAll();
    }

    // Get Device By Id
    public Device getById(UUID id) {
        return deviceRepository.findById(id).orElse(null);
    }

    // Delete Device
    public void delete(UUID id) {
        deviceRepository.deleteById(id);
    }
}