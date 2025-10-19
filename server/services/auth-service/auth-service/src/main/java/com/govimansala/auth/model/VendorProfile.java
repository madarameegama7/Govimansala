package com.govimansala.auth.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vendor_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vendorId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId", unique = true)
    private User user;

    private String companyName;
    private String licenseNo;
    private String location;
}
