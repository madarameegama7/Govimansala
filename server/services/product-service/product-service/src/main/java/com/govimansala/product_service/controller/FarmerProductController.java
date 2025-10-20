package com.govimansala.product_service.controller;

import com.govimansala.product_service.model.FarmerProduct;
import com.govimansala.product_service.model.ProductStatus; // Add this import
import com.govimansala.product_service.security.JwtUtil;
import com.govimansala.product_service.service.FarmerProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays; // Add this import
import java.util.List;

@RestController
@RequestMapping("/api/product/farmer_product")
public class FarmerProductController {

    private final FarmerProductService service;
    private final JwtUtil jwtUtil;

    public FarmerProductController(FarmerProductService service, JwtUtil jwtUtil) {
        this.service = service;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/all")
    public ResponseEntity<List<FarmerProduct>> getAllProducts() {
        return ResponseEntity.ok(service.getAllProducts());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(
            @RequestBody FarmerProduct product,
            @RequestHeader("Authorization") String authHeader) {

        System.out.println("=== POST /add called ===");
        System.out.println("Auth Header: " + (authHeader != null ? authHeader.substring(0, Math.min(50, authHeader.length())) + "..." : "NULL"));
        System.out.println("Request Body: " + product);

        try {
            // Validate token first
            if (!jwtUtil.validateToken(authHeader)) {
                System.out.println("Token validation failed");
                return ResponseEntity.status(401).body("Invalid token");
            }

            Long userId = jwtUtil.extractUserId(authHeader);
            System.out.println("Extracted User ID: " + userId);

            if (userId == null) {
                System.out.println("Failed to extract user ID from token");
                return ResponseEntity.status(401).body("Unable to extract user ID from token");
            }

            product.setUserId(userId);
            FarmerProduct saved = service.addProduct(product);
            System.out.println("Product saved successfully: " + saved.getProductId());

            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            System.out.println("Error in addProduct: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestBody FarmerProduct product,
            @RequestHeader("Authorization") String authHeader) {

        System.out.println("=== PUT /update/" + id + " called ===");
        System.out.println("Auth Header: " + (authHeader != null ? authHeader.substring(0, Math.min(50, authHeader.length())) + "..." : "NULL"));
        System.out.println("Request Body: " + product);

        try {
            // Validate token first
            if (!jwtUtil.validateToken(authHeader)) {
                System.out.println("Token validation failed");
                return ResponseEntity.status(401).body("Invalid token");
            }

            Long userId = jwtUtil.extractUserId(authHeader);
            System.out.println("Extracted User ID: " + userId);

            if (userId == null) {
                System.out.println("Failed to extract user ID from token");
                return ResponseEntity.status(401).body("Unable to extract user ID from token");
            }

            // Only allow update if product belongs to this farmer
            FarmerProduct existing = service.getProductById(id).orElse(null);
            System.out.println("Existing product: " + existing);

            if (existing == null) {
                System.out.println("Product not found with ID: " + id);
                return ResponseEntity.status(404).body("Product not found");
            }

            if (!existing.getUserId().equals(userId)) {
                System.out.println("User " + userId + " not authorized to update product " + id + " owned by " + existing.getUserId());
                return ResponseEntity.status(403).body("Not authorized to update this product");
            }

            System.out.println("Authorization successful, proceeding with update...");

            // Ensure status is valid before update
            if (product.getStatus() != null) {
                String status = product.getStatus().toString().toUpperCase();
                System.out.println("Status in request: " + product.getStatus() + " -> normalized: " + status);

                // Try to convert to uppercase to match constraint
                try {
                    ProductStatus productStatus = ProductStatus.valueOf(status);
                    product.setStatus(productStatus);
                } catch (IllegalArgumentException e) {
                    System.out.println("Invalid status value: " + status);
                    return ResponseEntity.status(400).body("Invalid status value. Allowed values: " + Arrays.toString(ProductStatus.values()));
                }
            }

            FarmerProduct updated = service.updateProduct(id, product);
            System.out.println("Product updated successfully: " + updated.getProductId());

            return ResponseEntity.ok(updated);

        } catch (Exception e) {
            System.out.println("Error in updateProduct: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {

        Long userId = jwtUtil.extractUserId(authHeader);
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        FarmerProduct existing = service.getProductById(id).orElse(null);
        if (existing == null || !existing.getUserId().equals(userId)) {
            return ResponseEntity.status(403).build();
        }

        service.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my")
    public ResponseEntity<List<FarmerProduct>> getMyProducts(@RequestHeader("Authorization") String authHeader) {
        Long userId = jwtUtil.extractUserId(authHeader);
        if (userId == null) return ResponseEntity.status(401).build();

        return ResponseEntity.ok(service.getProductsByUser(userId));
    }
}