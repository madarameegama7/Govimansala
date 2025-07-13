package com.govimansala.order_service.repository;

import com.govimansala.order_service.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface CartRepository extends JpaRepository<Cart,Integer>{
    Optional<Cart> findByUserId(int userId);
}