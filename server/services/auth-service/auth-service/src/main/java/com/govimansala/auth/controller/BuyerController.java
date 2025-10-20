package com.govimansala.auth.controller;

import com.govimansala.auth.model.BuyerProfile;
import com.govimansala.auth.service.BuyerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/buyers")
@RequiredArgsConstructor
public class BuyerController {

    private final BuyerService buyerService;

    @GetMapping
    public List<BuyerProfile> getAllBuyers() {
        return buyerService.getAllBuyers();
    }

    @DeleteMapping("/{id}")
    public void deleteBuyer(@PathVariable Long id) {
        buyerService.deleteBuyer(id);
    }


    @GetMapping("/user/{userId}")
    public BuyerProfile getBuyerByUserId(@PathVariable Long userId) {
        return buyerService.getBuyerByUserId(userId);
    }
}
