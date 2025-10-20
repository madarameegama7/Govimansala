package com.govimansala.order_service.analytics;

import com.govimansala.order_service.analytics.dto.VendorAnalyticsPayload;
import com.govimansala.order_service.service.VendorAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vendors/{vendorUserId}/analytics")
public class VendorAnalyticsController {

    private final VendorAnalyticsService analyticsService;

    @GetMapping
    public VendorAnalyticsPayload getAnalytics(@PathVariable int vendorUserId) {
        return analyticsService.getVendorAnalytics(vendorUserId);
    }
}
