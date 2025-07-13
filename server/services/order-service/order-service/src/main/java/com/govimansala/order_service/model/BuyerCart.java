package com.govimansala.order_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "buyer_cart")
@Getter
@Setter
public class BuyerCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartId;

    private int userId;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private List<BuyerCartItem> items = new ArrayList<>();
}
