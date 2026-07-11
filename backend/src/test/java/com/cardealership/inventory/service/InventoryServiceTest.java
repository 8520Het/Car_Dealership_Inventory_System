package com.cardealership.inventory.service;

import com.cardealership.inventory.entity.Vehicle;
import com.cardealership.inventory.repository.VehicleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InventoryServiceTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private InventoryService inventoryService;

    private UUID vehicleId;
    private Vehicle vehicle;

    @BeforeEach
    void setUp() {
        vehicleId = UUID.randomUUID();
        vehicle = new Vehicle();
        vehicle.setId(vehicleId);
        vehicle.setQuantity(5);
    }

    @Test
    void purchaseVehicle_ShouldDecreaseQuantity_WhenInStock() {
        when(vehicleRepository.findById(vehicleId)).thenReturn(Optional.of(vehicle));

        inventoryService.purchaseVehicle(vehicleId);

        assertThat(vehicle.getQuantity()).isEqualTo(4);
        verify(vehicleRepository, times(1)).save(vehicle);
    }

    @Test
    void purchaseVehicle_ShouldThrowException_WhenOutOfStock() {
        vehicle.setQuantity(0);
        when(vehicleRepository.findById(vehicleId)).thenReturn(Optional.of(vehicle));

        assertThrows(IllegalStateException.class, () -> inventoryService.purchaseVehicle(vehicleId));
        verify(vehicleRepository, never()).save(any());
    }

    @Test
    void purchaseVehicle_ShouldThrowException_WhenVehicleNotFound() {
        when(vehicleRepository.findById(vehicleId)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> inventoryService.purchaseVehicle(vehicleId));
        verify(vehicleRepository, never()).save(any());
    }

    @Test
    void restockVehicle_ShouldIncreaseQuantity_WhenAmountIsValid() {
        when(vehicleRepository.findById(vehicleId)).thenReturn(Optional.of(vehicle));

        inventoryService.restockVehicle(vehicleId, 10);

        assertThat(vehicle.getQuantity()).isEqualTo(15);
        verify(vehicleRepository, times(1)).save(vehicle);
    }

    @Test
    void restockVehicle_ShouldThrowException_WhenAmountIsZeroOrNegative() {
        assertThrows(IllegalArgumentException.class, () -> inventoryService.restockVehicle(vehicleId, 0));
        assertThrows(IllegalArgumentException.class, () -> inventoryService.restockVehicle(vehicleId, -5));
        
        verify(vehicleRepository, never()).save(any());
    }
}
