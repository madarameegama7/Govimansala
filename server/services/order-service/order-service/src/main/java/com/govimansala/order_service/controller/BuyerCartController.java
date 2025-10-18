package com.govimansala.order_service.controller;

import com.govimansala.order_service.dto.BuyerCartItemRequest;
import com.govimansala.order_service.model.BuyerCartItem;
import com.govimansala.order_service.service.BuyerCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buyer-cart")
public class BuyerCartController {

    @Autowired
    private BuyerCartService cartService;

    // Add or update cart item
    @PostMapping("/item")
    public ResponseEntity<BuyerCartItem> addOrUpdateItem(@RequestBody BuyerCartItemRequest request) {
        BuyerCartItem savedItem = cartService.addOrUpdateCartItem(request);
        return ResponseEntity.ok(savedItem);
    }

    // Get all cart items for buyer
    @GetMapping("/{buyerId}")
    public ResponseEntity<List<BuyerCartItem>> getCartItems(@PathVariable Long buyerId) {
        List<BuyerCartItem> items = cartService.getCartItems(buyerId);
        return ResponseEntity.ok(items);
    }

    // Delete a cart item by ID
    @DeleteMapping("/item/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
        cartService.deleteCartItem(id);
        return ResponseEntity.noContent().build();
    }
}
