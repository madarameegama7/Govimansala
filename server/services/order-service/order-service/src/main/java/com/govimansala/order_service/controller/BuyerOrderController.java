package com.govimansala.order_service.controller;

import com.govimansala.order_service.dto.BuyerOrderRequest;
import com.govimansala.order_service.model.BuyerOrder;
import com.govimansala.order_service.service.BuyerOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class BuyerOrderController {

    @Autowired
    private BuyerOrderService orderService;

    @PostMapping("/buyer")
    public ResponseEntity<BuyerOrder> placeBuyerOrder(@RequestBody BuyerOrderRequest request) {
        BuyerOrder savedOrder = orderService.placeOrder(request);
        return ResponseEntity.ok(savedOrder);
    }
}
