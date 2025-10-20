package com.govimansala.order_service.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorAnalyticsSummary {
    private long totalPurchases;   // total items sold
    private long ordersPlaced;     // total number of orders
    private long outForDelivery;   // in-transit or out-for-delivery orders
    private double totalRevenue;   // total sales amount
    private String currency;       // e.g. "LKR"
}
