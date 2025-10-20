package com.govimansala.auth.controller;

import com.govimansala.auth.model.FarmerProfile;
import com.govimansala.auth.service.FarmerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/farmers")
@RequiredArgsConstructor
public class FarmerController {

    private final FarmerService farmerService;

    @GetMapping
    public List<FarmerProfile> getAllFarmers() {
        return farmerService.getAllFarmers();
    }

    @DeleteMapping("/{id}")
    public void deleteFarmer(@PathVariable Long id) {
        farmerService.deleteFarmer(id);
    }

    @PatchMapping("/{id}/block")
    public FarmerProfile toggleBlock(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        boolean isBlocked = body.get("isBlocked");
        return farmerService.toggleBlock(id, isBlocked);
    }

    @GetMapping("/user/{userId}")
    public FarmerProfile getFarmerByUserId(@PathVariable Long userId) {
        return farmerService.getFarmerByUserId(userId);
    }
}
