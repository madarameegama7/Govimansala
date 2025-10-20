package com.govimansala.order_service.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorAnalyticsPayload {
    private VendorAnalyticsSummary summary;  // top stats
    private List<MonthlyPoint> monthly;      // chart data
    private List<TopSellerRow> topSellers;   // top buyers
}
