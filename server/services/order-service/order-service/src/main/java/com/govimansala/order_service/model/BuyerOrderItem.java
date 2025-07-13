package com.govimansala.order_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "buyer_order_items")
@Getter
@Setter
public class BuyerOrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private BuyerOrder order;

    private int productId;
    private int quantity;
    private double unitPrice;
}
