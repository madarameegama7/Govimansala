package com.govimansala.auth.controller;

import com.govimansala.auth.model.QaProfile;
import com.govimansala.auth.dto.FarmerProductDTO;
import com.govimansala.auth.service.QaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.govimansala.auth.service.JwtService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/qa")
@RequiredArgsConstructor
public class QaController {

    private final QaService qaService;
    private final JwtService jwtService;

    @GetMapping("/pending")
    public Map<String, Integer> getPendingCount() {
        List<FarmerProductDTO> pending = qaService.getPendingInspections();
        Map<String, Integer> response = new HashMap<>();
        response.put("count", pending.size());
        return response;
    }

    @GetMapping("/inspections")
    public List<FarmerProductDTO> getPendingInspections() {
        return qaService.getPendingInspections();
    }

    @GetMapping("/product/{productId}")
    public FarmerProductDTO getProduct(@PathVariable Long productId) {
        return qaService.getProductDetails(productId);
    }

    @PostMapping("/approve/{productId}")
    public FarmerProductDTO approveProduct(@PathVariable Long productId) {
        return qaService.approveProduct(productId);
    }

    @PostMapping("/reject/{productId}")
    public FarmerProductDTO rejectProduct(@PathVariable Long productId) {
        return qaService.rejectProduct(productId);
    }

    @GetMapping("/profile/{userId}")
    public QaProfile getProfile(@PathVariable Long userId) {
        return qaService.getProfile(userId);
    }


    @PutMapping("/profile")
    public QaProfile updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody QaProfile profile) {

        // Extract JWT token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }
        String token = authHeader.substring(7);
        Long userId = jwtService.extractUserId(token); // Implement this method in JwtService

        return qaService.updateProfile(userId, profile);
    }
}
