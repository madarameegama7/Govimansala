package com.govimansala.product_service.repository;

import com.govimansala.product_service.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findByProductName(String productName);
    Optional<Product> findByUserId(int userId);
    Optional<Product> findByProductId(int productId);
}