package com.govimansala.order_service.controller;

import com.govimansala.order_service.service.OrderListItem;
import com.govimansala.order_service.service.PagedResponse;
import com.govimansala.order_service.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vendors")
public class VendorOrderController {

    private final OrderService orderService;

    // GET /api/vendors/{vendorUserId}/orders?status=&q=&page=1&pageSize=12
    @GetMapping("/{vendorUserId}/orders")
    public PagedResponse<OrderListItem> listVendorOrders(
            @PathVariable int vendorUserId,
            @RequestParam(required = false) String status, // Placed | Out for Delivery | Delivered | Returned
            @RequestParam(required = false) String q,      // "00007" or "YYYY-MM-DD"
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int pageSize) {

        return orderService.getVendorOrders(vendorUserId, status, q, page, pageSize);
    }
}
