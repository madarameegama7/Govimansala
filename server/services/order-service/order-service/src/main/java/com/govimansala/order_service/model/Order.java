package com.govimansala.order_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
public abstract class Order{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int orderId;

    protected int userId;

    protected double totalAmount;

    protected LocalDateTime createdAt = LocalDateTime.now();

}