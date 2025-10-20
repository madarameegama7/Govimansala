package com.govimansala.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FarmerProductDTO {

    private Long productId;
    private Long userId;
    private String name;
    private String category;
    private String description;
    private Integer quantity;
    private Double unitPrice;
    private String location;
    private Boolean isOrganic;
    private String status; // PENDING, AVAILABLE, EXPIRED
    private String harvestDate;
    private String expiryDate;

    // Constructor for status update only
    public FarmerProductDTO(String status) {
        this.status = status;
    }
}
