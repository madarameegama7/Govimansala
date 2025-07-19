package com.govimansala.product_service.repository;

import com.govimansala.product_service.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findByProductName(String productName);

    List<Product> findByUserId(int userId);

    Optional<Product> findByProductId(int productId);
}