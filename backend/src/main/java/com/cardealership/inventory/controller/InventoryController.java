package com.cardealership.inventory.controller;

import com.cardealership.inventory.dto.ApiResponse;
import com.cardealership.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping("/{id}/purchase")
    public ResponseEntity<ApiResponse<Void>> purchaseVehicle(@PathVariable UUID id) {
        inventoryService.purchaseVehicle(id);
        return ResponseEntity.ok(ApiResponse.success("Vehicle purchased successfully", null));
    }

    @PostMapping("/{id}/restock")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> restockVehicle(
            @PathVariable UUID id,
            @RequestParam int amount) {
        inventoryService.restockVehicle(id, amount);
        return ResponseEntity.ok(ApiResponse.success("Vehicle restocked successfully", null));
    }
}
