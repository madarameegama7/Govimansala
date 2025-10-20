package com.govimansala.product_service.controller;

import com.govimansala.product_service.repository.VendorProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/vendors")
public class VendorInternalController {

    private final VendorProductRepository repo;

    // GET /internal/vendors/{vendorUserId}/product-ids
    @GetMapping("/{vendorUserId}/product-ids")
    public List<Integer> getProductIds(@PathVariable int vendorUserId) {
        return repo.findProductIdsByVendorUserId(vendorUserId);
    }
}
