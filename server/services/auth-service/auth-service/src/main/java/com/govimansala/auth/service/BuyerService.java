package com.govimansala.auth.service;

import com.govimansala.auth.model.BuyerProfile;
import com.govimansala.auth.repository.BuyerProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BuyerService {

    private final BuyerProfileRepository buyerProfileRepository;

    @Autowired
    public BuyerService(BuyerProfileRepository buyerProfileRepository) {
        this.buyerProfileRepository = buyerProfileRepository;
    }

    // Get all buyers
    public List<BuyerProfile> getAllBuyers() {
        return buyerProfileRepository.findAll();
    }

    // Delete buyer by ID
    public void deleteBuyer(Long id) {
        buyerProfileRepository.deleteById(id);
    }

    // Find buyer by user ID
    public BuyerProfile getBuyerByUserId(Long userId) {
        return buyerProfileRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Buyer not found with user id: " + userId));
    }
}