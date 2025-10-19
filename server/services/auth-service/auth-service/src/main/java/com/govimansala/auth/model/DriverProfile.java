package com.govimansala.auth.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "driver_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DriverProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long driverId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId", unique = true)
    private User user;

    private String licenseNumber;
    private String vehicleNo;
    private boolean isAvailable = true;
    private String currentLocation;
}
