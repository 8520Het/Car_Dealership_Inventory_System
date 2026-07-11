package com.cardealership.inventory.service;

import com.cardealership.inventory.entity.Vehicle;
import com.cardealership.inventory.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final VehicleRepository vehicleRepository;

    @Transactional
    public void purchaseVehicle(UUID id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found with ID: " + id));

        if (vehicle.getQuantity() <= 0) {
            throw new IllegalStateException("Vehicle is out of stock.");
        }

        vehicle.setQuantity(vehicle.getQuantity() - 1);
        vehicleRepository.save(vehicle);
    }

    @Transactional
    public void restockVehicle(UUID id, int amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Restock amount must be greater than zero.");
        }

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found with ID: " + id));

        vehicle.setQuantity(vehicle.getQuantity() + amount);
        vehicleRepository.save(vehicle);
    }
}
