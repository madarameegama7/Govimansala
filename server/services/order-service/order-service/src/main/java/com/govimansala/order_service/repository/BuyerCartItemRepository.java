package com.govimansala.order_service.repository;

import com.govimansala.order_service.model.BuyerCartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BuyerCartItemRepository extends JpaRepository<BuyerCartItem, Long> {
    List<BuyerCartItem> findByBuyerId(Long buyerId);
    Optional<BuyerCartItem> findByBuyerIdAndProductId(Long buyerId, Long productId);
}
