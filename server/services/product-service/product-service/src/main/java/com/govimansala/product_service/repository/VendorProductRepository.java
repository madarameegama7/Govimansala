package com.govimansala.product_service.repository;

import com.govimansala.product_service.model.VendorProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VendorProductRepository extends JpaRepository<VendorProduct, Integer> {
    List<VendorProduct> findByProductIdIn(List<Integer> productIds);

    @Query("select v.productId from VendorProduct v where v.userId = :vendorUserId")
    List<Integer> findProductIdsByVendorUserId(@Param("vendorUserId") int vendorUserId);
}
