// order-service
package com.govimansala.order_service.client;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ProductClient {
    private final RestTemplate rest;

    // Calls product-service by service-id via Eureka (lb://product-service)
    public List<Integer> getProductIdsForVendor(int vendorId) {
        String url = "http://product-service/api/product/vendors/{vendorId}/product-ids";
        Map<?,?> body = rest.getForObject(url, Map.class, vendorId);
        if (body == null) return Collections.emptyList();
        Object ids = body.get("productIds");
        if (ids instanceof List<?> list)
            return list.stream().map(o -> ((Number) o).intValue()).toList();
        return Collections.emptyList();
    }
}
