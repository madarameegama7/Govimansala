package com.govimansala.product_service.repository;

import com.govimansala.product_service.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findByProductName(String productName);

    List<Product> findByUserId(int userId);

    Optional<Product> findByProductId(int productId);

    List<Product> findByProductCategory(String productCategory);

    // NEW: Return only product IDs for a vendor (vendor = userId in your schema)
    @Query("select p.productId from Product p where p.userId = :vendorUserId")
    List<Integer> findProductIdsByVendor(@Param("vendorUserId") int vendorUserId);
}