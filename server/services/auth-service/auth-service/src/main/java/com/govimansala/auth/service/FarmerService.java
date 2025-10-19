package com.govimansala.auth.service;

import com.govimansala.auth.model.FarmerProfile;
import com.govimansala.auth.repository.FarmerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FarmerService {

    private final FarmerProfileRepository farmerProfileRepository;

    public List<FarmerProfile> getAllFarmers() {
        return farmerProfileRepository.findAll();
    }

    public void deleteFarmer(Long id) {
        farmerProfileRepository.deleteById(id);
    }

    public FarmerProfile toggleBlock(Long id, boolean isBlocked) {
        FarmerProfile farmer = farmerProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
        farmer.setCredits(isBlocked ? 0 : farmer.getCredits());
        return farmerProfileRepository.save(farmer);
    }

    public FarmerProfile getFarmerByUserId(Long userId) {
        return farmerProfileRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
    }
}
