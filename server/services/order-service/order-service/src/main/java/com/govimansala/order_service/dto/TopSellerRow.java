package com.govimansala.order_service.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopSellerRow {
    private String name;       // buyer/customer name (placeholder for now)
    private int orders;        // number of orders by this buyer
    private double revenue;    // total amount spent
    private String avatar;     // e.g. initials
    private String bgColor;    // color code for avatar
    private String trend;      // "up" or "down"
}
