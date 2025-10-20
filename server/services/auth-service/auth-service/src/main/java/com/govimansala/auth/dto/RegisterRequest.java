package com.govimansala.auth.dto;

import com.govimansala.auth.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String confirmPassword;

    @Pattern(regexp = "\\d{10}", message = "Phone must be 10 digits")
    private String phone;

    private String address;
    private Role role;

    // 🔹 Farmer-specific fields
    private Double farmSize;
    private String farmType;
    private String location;

    // 🔹 Vendor-specific fields
    private String companyName;
    private String licenseNo;

    // 🔹 Buyer-specific fields
    private String businessName;
    private String deliveryAddress;

    // 🔹 Driver-specific fields
    private String licenseNumber;
    private String vehicleNo;
    private String currentLocation;

    //QA specific fields
    private String certificationId;
    private String expertiseArea;
    private String region;
    private Integer yearsOfExperience;

}
