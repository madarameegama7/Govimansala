package com.govimansala.order_service.controller;

import com.govimansala.order_service.dto.BuyerOrderRequest;
import com.govimansala.order_service.model.BuyerOrder;
import com.govimansala.order_service.service.BuyerOrderService;
import com.govimansala.order_service.enums.DeliveryStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/buyer-order")
public class BuyerOrderController {

    @Autowired
    private BuyerOrderService orderService;

    @PostMapping("/buyer")
    public ResponseEntity<BuyerOrder> placeBuyerOrder(@RequestBody BuyerOrderRequest request) {
        BuyerOrder savedOrder = orderService.placeOrder(request);
        return ResponseEntity.ok(savedOrder);
    }

    // Update delivery status of an order
    @PutMapping("/{orderId}/delivery-status")
    public ResponseEntity<BuyerOrder> updateDeliveryStatus(@PathVariable Long orderId,@RequestParam DeliveryStatus status) {
            try {
                BuyerOrder updatedOrder = orderService.updateDeliveryStatus(orderId, status);
                return ResponseEntity.ok(updatedOrder);
            } catch (RuntimeException e) {
                return ResponseEntity.notFound().build();
            }
        }

    // Get order delivery status
    @GetMapping("/{orderId}/delivery-status")
    public ResponseEntity<DeliveryStatus> getDeliveryStatus(@PathVariable Long orderId) {
            Optional<BuyerOrder> orderOptional = orderService.getOrderById(orderId);
            if (orderOptional.isPresent() && orderOptional.get().getDeliveryStatus() != null) {
                return ResponseEntity.ok(orderOptional.get().getDeliveryStatus());
            }
            return ResponseEntity.notFound().build();
        }
}
