package com.govimansala.order_service.controller;

import com.govimansala.order_service.dto.BuyerOrderRequest;
import com.govimansala.order_service.enums.DeliveryStatus;
import com.govimansala.order_service.model.BuyerOrder;
import com.govimansala.order_service.service.BuyerOrderService;
import com.govimansala.order_service.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/buyer-order")
public class BuyerOrderController {

    @Autowired
    private BuyerOrderService orderService;

    @Autowired
    private JwtUtil jwtUtil;

    private Long extractBuyerIdFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        String token = authHeader.substring(7);
        try {
            return Long.parseLong(jwtUtil.extractUserId(token));
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/buyer")
    public ResponseEntity<BuyerOrder> placeBuyerOrder(@RequestBody BuyerOrderRequest request,
                                                      HttpServletRequest httpRequest) {
        Long buyerId = extractBuyerIdFromRequest(httpRequest);
        if (buyerId == null || !buyerId.equals(request.getBuyerId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        BuyerOrder savedOrder = orderService.placeOrder(request);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/buyer")
    public ResponseEntity<List<BuyerOrder>> getOrdersForBuyer(HttpServletRequest httpRequest) {
        Long buyerId = extractBuyerIdFromRequest(httpRequest);
        if (buyerId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        List<BuyerOrder> orders = orderService.getOrdersByBuyerId(buyerId);
        if (orders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(orders);
    }


    @GetMapping("/{orderId}")
    public ResponseEntity<BuyerOrder> getBuyerOrder(@PathVariable Long orderId,
                                                    HttpServletRequest httpRequest) {
        Long buyerId = extractBuyerIdFromRequest(httpRequest);
        if (buyerId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Optional<BuyerOrder> orderOptional = orderService.getOrderById(orderId);
        if (orderOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        BuyerOrder order = orderOptional.get();
        if (!buyerId.equals(order.getBuyerId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(order);
    }

    @PutMapping("/{orderId}/delivery-status")
    public ResponseEntity<BuyerOrder> updateDeliveryStatus(@PathVariable Long orderId,
                                                           @RequestParam DeliveryStatus status,
                                                           HttpServletRequest httpRequest) {
        Long buyerId = extractBuyerIdFromRequest(httpRequest);
        if (buyerId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Optional<BuyerOrder> optionalOrder = orderService.getOrderById(orderId);
        if (optionalOrder.isEmpty() || !buyerId.equals(optionalOrder.get().getBuyerId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        try {
            BuyerOrder updatedOrder = orderService.updateDeliveryStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{orderId}/delivery-status")
    public ResponseEntity<DeliveryStatus> getDeliveryStatus(@PathVariable Long orderId,
                                                            HttpServletRequest httpRequest) {
        Long buyerId = extractBuyerIdFromRequest(httpRequest);
        if (buyerId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Optional<BuyerOrder> orderOptional = orderService.getOrderById(orderId);
        if (orderOptional.isEmpty() || !buyerId.equals(orderOptional.get().getBuyerId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        if (orderOptional.get().getDeliveryStatus() != null) {
            return ResponseEntity.ok(orderOptional.get().getDeliveryStatus());
        }
        return ResponseEntity.notFound().build();
    }
}
