package com.govimansala.auth.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "farmer_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FarmerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long farmerId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId", unique = true)
    private User user;

    private Double farmSize;
    private String farmType;
    private String location;
    private Integer credits = 0;
}
