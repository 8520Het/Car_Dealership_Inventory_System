package com.cardealership.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleSearchCriteria {
    private String make;
    private String model;
    private String category;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}
