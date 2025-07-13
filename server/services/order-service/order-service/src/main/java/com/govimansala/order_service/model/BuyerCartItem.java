package com.govimansala.order_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "buyer_cart_items")
@Getter
@Setter
public class BuyerCartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private BuyerCart cart;

    private int productId;
    private int quantity;
}
