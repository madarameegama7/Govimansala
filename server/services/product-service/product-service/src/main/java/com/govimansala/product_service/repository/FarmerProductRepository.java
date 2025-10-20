package com.govimansala.product_service.repository;

import com.govimansala.product_service.model.FarmerProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmerProductRepository extends JpaRepository<FarmerProduct, Long> {

    // Add this method
    List<FarmerProduct> findByUserId(Long userId);
}