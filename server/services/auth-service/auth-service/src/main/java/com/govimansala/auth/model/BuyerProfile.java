package com.govimansala.auth.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "buyer_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuyerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buyerId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId", unique = true)
    private User user;

    private String businessName;
    private String deliveryAddress;
}
