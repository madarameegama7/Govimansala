package com.govimansala.product_service.service;

import com.govimansala.product_service.model.FarmerProduct;
import com.govimansala.product_service.repository.BuyerProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BuyerProductService {

    @Autowired
    private BuyerProductRepository repository;

    public List<FarmerProduct> getAllByCategory(String category) {
        return repository.findByCategoryIgnoreCase(category);
    }

    public List<FarmerProduct> getOrganicByCategory(String category) {
        return repository.findByCategoryIgnoreCaseAndIsOrganicTrue(category);
    }

    public List<FarmerProduct> getConventionalByCategory(String category) {
        return repository.findByCategoryIgnoreCaseAndIsOrganicFalse(category);
    }
}
