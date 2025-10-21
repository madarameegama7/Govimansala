package com.govimansala.product_service.repository;
import com.govimansala.product_service.model.FarmerProduct;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BuyerProductRepository extends JpaRepository<FarmerProduct, Long> {
    List<FarmerProduct> findByCategoryIgnoreCase(String category);

    List<FarmerProduct> findByCategoryIgnoreCaseAndIsOrganicTrue(String category);

    List<FarmerProduct> findByCategoryIgnoreCaseAndIsOrganicFalse(String category);

    List<FarmerProduct> findByNameIgnoreCase(String name);
}
