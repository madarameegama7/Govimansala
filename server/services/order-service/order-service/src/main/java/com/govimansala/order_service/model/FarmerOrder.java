package com.govimansala.order_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "farmer_orders")
@Getter
@Setter
public class BuyerOrder extends Order{
    @Enumerated(EnumType.STRING)
    private FarmerOrderStatus status;

}