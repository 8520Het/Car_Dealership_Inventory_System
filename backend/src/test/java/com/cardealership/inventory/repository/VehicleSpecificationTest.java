package com.cardealership.inventory.repository;

import com.cardealership.inventory.dto.VehicleSearchCriteria;
import com.cardealership.inventory.entity.Vehicle;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class VehicleSpecificationTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @Autowired
    private VehicleRepository vehicleRepository;

    @Test
    void searchVehicles_WithMakeAndMaxPrice() {
        // Arrange
        Vehicle v1 = vehicleRepository.save(Vehicle.builder()
                .make("Toyota")
                .model("Camry")
                .category("Sedan")
                .price(new BigDecimal("20000"))
                .quantity(5)
                .build());

        Vehicle v2 = vehicleRepository.save(Vehicle.builder()
                .make("Toyota")
                .model("Corolla")
                .category("Sedan")
                .price(new BigDecimal("30000"))
                .quantity(3)
                .build());

        VehicleSearchCriteria criteria = new VehicleSearchCriteria();
        criteria.setMake("Toy"); // Should be case-insensitive LIKE
        criteria.setMaxPrice(new BigDecimal("25000"));

        Specification<Vehicle> spec = VehicleSpecification.getSearchSpecification(criteria);

        // Act
        Page<Vehicle> result = vehicleRepository.findAll(spec, PageRequest.of(0, 10));
        List<Vehicle> content = result.getContent();

        // Assert
        assertThat(content).hasSize(1);
        assertThat(content.get(0).getModel()).isEqualTo("Camry");
    }
}
