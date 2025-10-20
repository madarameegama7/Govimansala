// order-service
package com.govimansala.order_service.service;

import com.govimansala.order_service.analytics.dto.*;
import com.govimansala.order_service.client.ProductClient;
import com.govimansala.order_service.repository.VendorAnalyticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VendorAnalyticsService {

    private final VendorAnalyticsRepository repo;
    private final ProductClient productClient;

    public VendorAnalyticsPayload getVendorAnalytics(int vendorId) {
        List<Integer> productIds = productClient.getProductIdsForVendor(vendorId);
        if (productIds == null || productIds.isEmpty()) {
            return new VendorAnalyticsPayload(
                    new VendorAnalyticsSummary(0, 0, 0, 0, "LKR"),
                    List.of(),
                    List.of()
            );
        }

        var s = repo.getSummary(productIds);
        var summary = new VendorAnalyticsSummary(
                ((Number) s.getOrDefault("totalitems", 0)).longValue(),     // totalPurchases
                ((Number) s.getOrDefault("ordersplaced", 0)).longValue(),   // ordersPlaced
                ((Number) s.getOrDefault("outfordelivery", 0)).longValue(), // outForDelivery
                ((Number) s.getOrDefault("totalrevenue", 0)).doubleValue(), // totalRevenue
                "LKR"
        );

        var monthly = repo.getMonthlyRevenue(productIds).stream()
                .map(m -> new MonthlyPoint((String) m.get("month"),
                        ((Number) m.get("total")).intValue()))
                .toList();

        var top = repo.getTopCustomers(productIds).stream()
                .map(m -> new TopSellerRow(
                        "Buyer " + m.get("buyerid"),
                        ((Number) m.get("orders")).intValue(),
                        ((Number) m.get("revenue")).doubleValue(),
                        "CU", "#4F46E5", "up"))
                .toList();

        return new VendorAnalyticsPayload(summary, monthly, top);
    }
}
