package com.govimansala.order_service.repository;

import com.govimansala.order_service.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    Optional<CartItem> findByItemId(int itemId);
    List<CartItem> findByCart_CartId(int cartId);

}
