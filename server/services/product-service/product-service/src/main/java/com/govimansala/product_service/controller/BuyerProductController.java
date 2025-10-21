package com.govimansala.product_service.controller;

import com.govimansala.product_service.model.FarmerProduct;
import com.govimansala.product_service.model.ProductStatus;
import com.govimansala.product_service.security.JwtUtil;
import com.govimansala.product_service.service.BuyerProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product/buyer_product")
public class BuyerProductController {

    @Autowired
    private BuyerProductService service;

    // Retrieve all products in category (fruits or vegetables)
    @GetMapping("/{category}")
    public ResponseEntity<List<FarmerProduct>> getAllByCategory(@PathVariable String category) {
        List<FarmerProduct> products = service.getAllByCategory(category);
        return ResponseEntity.ok(products);
    }

    // Retrieve organic products in category
    @GetMapping("/{category}/organic")
    public ResponseEntity<List<FarmerProduct>> getOrganicByCategory(@PathVariable String category) {
        List<FarmerProduct> products = service.getOrganicByCategory(category);
        return ResponseEntity.ok(products);
    }

    // Retrieve conventional products in category
    @GetMapping("/{category}/conventional")
    public ResponseEntity<List<FarmerProduct>> getConventionalByCategory(@PathVariable String category) {
        List<FarmerProduct> products = service.getConventionalByCategory(category);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/product_name/{name}")
    public ResponseEntity<List<FarmerProduct>> getAllByProductName(@PathVariable String name) {
        List<FarmerProduct> products = service.getAllByProductName(name);
        return ResponseEntity.ok(products);
    }
}
