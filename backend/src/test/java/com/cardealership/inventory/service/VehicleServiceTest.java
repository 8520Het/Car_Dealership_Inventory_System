package com.cardealership.inventory.service;

import com.cardealership.inventory.dto.VehicleRequest;
import com.cardealership.inventory.dto.VehicleResponse;
import com.cardealership.inventory.entity.Vehicle;
import com.cardealership.inventory.repository.VehicleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VehicleServiceTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private VehicleService vehicleService;

    private Vehicle testVehicle;
    private UUID vehicleId;

    @BeforeEach
    void setUp() {
        vehicleId = UUID.randomUUID();
        testVehicle = Vehicle.builder()
                .id(vehicleId)
                .make("Toyota")
                .model("Camry")
                .category("Sedan")
                .price(new BigDecimal("25000.00"))
                .quantity(10)
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    void createVehicle_ShouldReturnVehicleResponse() {
        VehicleRequest request = new VehicleRequest("Toyota", "Camry", "Sedan", new BigDecimal("25000.00"), 10);
        when(vehicleRepository.save(any(Vehicle.class))).thenReturn(testVehicle);

        VehicleResponse response = vehicleService.createVehicle(request);

        assertThat(response).isNotNull();
        assertThat(response.getMake()).isEqualTo("Toyota");
        assertThat(response.getPrice()).isEqualTo(new BigDecimal("25000.00"));
        verify(vehicleRepository, times(1)).save(any(Vehicle.class));
    }

    @Test
    void getVehicleById_ShouldReturnVehicle() {
        when(vehicleRepository.findById(vehicleId)).thenReturn(Optional.of(testVehicle));

        VehicleResponse response = vehicleService.getVehicleById(vehicleId);

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(vehicleId);
        verify(vehicleRepository, times(1)).findById(vehicleId);
    }

    @Test
    void getVehicleById_ShouldThrowException_WhenNotFound() {
        when(vehicleRepository.findById(vehicleId)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> vehicleService.getVehicleById(vehicleId));
        verify(vehicleRepository, times(1)).findById(vehicleId);
    }

    @Test
    void updateVehicle_ShouldReturnUpdatedVehicle() {
        VehicleRequest request = new VehicleRequest("Honda", "Accord", "Sedan", new BigDecimal("28000.00"), 5);
        when(vehicleRepository.findById(vehicleId)).thenReturn(Optional.of(testVehicle));
        
        Vehicle updatedVehicle = Vehicle.builder()
                .id(vehicleId)
                .make("Honda")
                .model("Accord")
                .category("Sedan")
                .price(new BigDecimal("28000.00"))
                .quantity(5)
                .build();
                
        when(vehicleRepository.save(any(Vehicle.class))).thenReturn(updatedVehicle);

        VehicleResponse response = vehicleService.updateVehicle(vehicleId, request);

        assertThat(response.getMake()).isEqualTo("Honda");
        assertThat(response.getPrice()).isEqualTo(new BigDecimal("28000.00"));
        verify(vehicleRepository, times(1)).save(any(Vehicle.class));
    }

    @Test
    void deleteVehicle_ShouldCallDelete_WhenExists() {
        when(vehicleRepository.existsById(vehicleId)).thenReturn(true);

        vehicleService.deleteVehicle(vehicleId);

        verify(vehicleRepository, times(1)).deleteById(vehicleId);
    }

    @Test
    void deleteVehicle_ShouldThrowException_WhenNotExists() {
        when(vehicleRepository.existsById(vehicleId)).thenReturn(false);

        assertThrows(IllegalArgumentException.class, () -> vehicleService.deleteVehicle(vehicleId));
        verify(vehicleRepository, never()).deleteById(vehicleId);
    }
}
