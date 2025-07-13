package com.govimansala.order_service.repository;

import com.govimansala.order_service.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    Optional<CartItem> findByItemId(int itemId);
}
