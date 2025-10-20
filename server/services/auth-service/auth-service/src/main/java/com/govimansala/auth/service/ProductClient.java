package com.govimansala.auth.service;

import com.govimansala.auth.dto.FarmerProductDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductClient {

    private final WebClient.Builder webClientBuilder;

    private final String PRODUCT_SERVICE_URL = "http://localhost:8080/api/product/farmer_product";

    public List<FarmerProductDTO> getPendingProducts() {
        return webClientBuilder.build()
                .get()
                .uri(PRODUCT_SERVICE_URL + "/pending")
                .retrieve()
                .bodyToFlux(FarmerProductDTO.class)
                .collectList()
                .block();
    }

    public FarmerProductDTO getProductById(Long productId) {
        return webClientBuilder.build()
                .get()
                .uri(PRODUCT_SERVICE_URL + "/" + productId)
                .retrieve()
                .bodyToMono(FarmerProductDTO.class)
                .block();
    }

    public FarmerProductDTO approveProduct(Long productId) {
        return webClientBuilder.build()
                .post()
                .uri(PRODUCT_SERVICE_URL + "/approve/" + productId)
                .retrieve()
                .bodyToMono(FarmerProductDTO.class)
                .block();
    }

    public FarmerProductDTO rejectProduct(Long productId) {
        return webClientBuilder.build()
                .post()
                .uri(PRODUCT_SERVICE_URL + "/reject/" + productId)
                .retrieve()
                .bodyToMono(FarmerProductDTO.class)
                .block();
    }
}
