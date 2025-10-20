package com.govimansala.product_service.controller;

import com.govimansala.product_service.model.VendorProduct;
import com.govimansala.product_service.repository.VendorProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/products")
public class InternalVendorController {

    private final VendorProductRepository repo;

    // GET /internal/products/vendor/by-ids?ids=13,14,16
    @GetMapping("/vendor/by-ids")
    public Map<Integer, Integer> getVendorUserIds(@RequestParam("ids") List<Integer> ids) {
        List<VendorProduct> rows = repo.findByProductIdIn(ids);
        return rows.stream()
                .collect(Collectors.toMap(VendorProduct::getProductId, VendorProduct::getUserId));
    }
}
