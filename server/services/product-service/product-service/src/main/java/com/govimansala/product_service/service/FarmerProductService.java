package com.govimansala.product_service.service;

import com.govimansala.product_service.model.FarmerProduct;
import com.govimansala.product_service.repository.FarmerProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FarmerProductService {

    private final FarmerProductRepository farmerProductRepository; // Make sure this is injected

    public FarmerProductService(FarmerProductRepository farmerProductRepository) {
        this.farmerProductRepository = farmerProductRepository;
    }

    public List<FarmerProduct> getAllProducts() {
        return farmerProductRepository.findAll();
    }

    public FarmerProduct addProduct(FarmerProduct product) {
        return farmerProductRepository.save(product);
    }

    public Optional<FarmerProduct> getProductById(Long id) {
        return farmerProductRepository.findById(id);
    }

    public FarmerProduct updateProduct(Long id, FarmerProduct productDetails) {
        return farmerProductRepository.findById(id)
                .map(existingProduct -> {
                    // Update only the fields that should be changed
                    if (productDetails.getName() != null) {
                        existingProduct.setName(productDetails.getName());
                    }
                    if (productDetails.getCategory() != null) {
                        existingProduct.setCategory(productDetails.getCategory());
                    }
                    if (productDetails.getDescription() != null) {
                        existingProduct.setDescription(productDetails.getDescription());
                    }
                    if (productDetails.getQuantity() != null) {
                        existingProduct.setQuantity(productDetails.getQuantity());
                    }
                    if (productDetails.getUnitPrice() != null) {
                        existingProduct.setUnitPrice(productDetails.getUnitPrice());
                    }
                    if (productDetails.getLocation() != null) {
                        existingProduct.setLocation(productDetails.getLocation());
                    }
                    if (productDetails.getIsOrganic() != null) {
                        existingProduct.setIsOrganic(productDetails.getIsOrganic());
                    }
                    if (productDetails.getStatus() != null) {
                        existingProduct.setStatus(productDetails.getStatus());
                    }
                    if (productDetails.getHarvestDate() != null) {
                        existingProduct.setHarvestDate(productDetails.getHarvestDate());
                    }
                    if (productDetails.getExpiryDate() != null) {
                        existingProduct.setExpiryDate(productDetails.getExpiryDate());
                    }

                    return farmerProductRepository.save(existingProduct);
                })
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public void deleteProduct(Long id) {
        farmerProductRepository.deleteById(id);
    }

    public List<FarmerProduct> getProductsByUser(Long userId) {
        return farmerProductRepository.findByUserId(userId);
    }
}