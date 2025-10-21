// product-service
package com.govimansala.product_service.controller;

import com.govimansala.product_service.repository.VendorProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product/vendors")
public class VendorProductsController {

    private final VendorProductRepository repo;

    // GET /api/product/vendors/{vendorId}/product-ids
    @GetMapping("/{vendorId}/product-ids")
    public Map<String, List<Integer>> getVendorProductIds(@PathVariable int vendorId) {
        var ids = repo.findProductIdsByVendorUserId(vendorId);
        return Map.of("productIds", ids);
    }
}
