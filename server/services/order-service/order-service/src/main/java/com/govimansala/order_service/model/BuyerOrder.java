package com.govimansala.order_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "buyer_orders")
@Getter
@Setter
public class BuyerOrder extends Order{
    @Enumerated(EnumType.STRING)
    private BuyerOrderStatus status;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;

    private String assignedDriver;


}