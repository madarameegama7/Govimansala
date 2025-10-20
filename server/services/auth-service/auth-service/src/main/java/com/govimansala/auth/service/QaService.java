package com.govimansala.auth.service;

import com.govimansala.auth.model.QaProfile;
import com.govimansala.auth.model.User;
import com.govimansala.auth.repository.QaProfileRepository;
import com.govimansala.auth.repository.UserRepository;
import com.govimansala.auth.dto.FarmerProductDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QaService {

    private final QaProfileRepository qaRepo;
    private final UserRepository userRepo;
    private final WebClient webClient; // call product-service

    private final String PRODUCT_SERVICE_URL = "http://localhost:8080/api/product/farmer_product";

    public QaProfile getProfile(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return qaRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("QA profile not found"));
    }



    public QaProfile updateProfile(Long userId, QaProfile updatedProfile) {
        QaProfile profile = getProfile(userId);
        profile.setCertificationId(updatedProfile.getCertificationId());
        profile.setExpertiseArea(updatedProfile.getExpertiseArea());
        profile.setRegion(updatedProfile.getRegion());
        profile.setYearsOfExperience(updatedProfile.getYearsOfExperience());
        return qaRepo.save(profile);
    }


    public List<FarmerProductDTO> getPendingInspections() {
        FarmerProductDTO[] pending = webClient.get()
                .uri(PRODUCT_SERVICE_URL + "/all")
                .retrieve()
                .bodyToMono(FarmerProductDTO[].class)
                .block();

        if (pending == null) return List.of();

        return Arrays.stream(pending)
                .filter(p -> p.getStatus().equals("AVAILABLE"))
                .toList();
    }

    public FarmerProductDTO approveProduct(Long productId) {
        return webClient.post()
                .uri(PRODUCT_SERVICE_URL + "/update/" + productId)
                .bodyValue(new FarmerProductDTO("AVAILABLE")) // set status to APPROVED/AVAILABLE
                .retrieve()
                .bodyToMono(FarmerProductDTO.class)
                .block();
    }

    public FarmerProductDTO rejectProduct(Long productId) {
        return webClient.post()
                .uri(PRODUCT_SERVICE_URL + "/update/" + productId)
                .bodyValue(new FarmerProductDTO("EXPIRED")) // set status to REJECTED/EXPIRED
                .retrieve()
                .bodyToMono(FarmerProductDTO.class)
                .block();
    }

    public FarmerProductDTO getProductDetails(Long productId) {
        return webClient.get()
                .uri(PRODUCT_SERVICE_URL + "/my") // or /all and filter by id
                .retrieve()
                .bodyToMono(FarmerProductDTO.class)
                .block();
    }
}
