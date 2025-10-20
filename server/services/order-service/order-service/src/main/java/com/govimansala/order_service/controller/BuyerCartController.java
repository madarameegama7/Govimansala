package com.govimansala.order_service.controller;

import com.govimansala.order_service.dto.BuyerCartItemRequest;
import com.govimansala.order_service.model.BuyerCartItem;
import com.govimansala.order_service.service.BuyerCartService;
import com.govimansala.order_service.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/buyer-cart")
public class BuyerCartController {

    @Autowired
    private BuyerCartService cartService;

    @Autowired
    private JwtUtil jwtUtil;

    private Long extractBuyerIdFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("❌ No Authorization header or wrong format");
            return null;
        }
        String token = authHeader.substring(7);
        try {
            String userId = jwtUtil.extractUserId(token);
            System.out.println("✅ Extracted user ID from token: " + userId);
            return Long.parseLong(userId);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("❌ Failed to extract userId from token");
            return null;
        }
    }

    @PostMapping("/item")
    public ResponseEntity<BuyerCartItem> addOrUpdateItem(@RequestBody BuyerCartItemRequest request,
                                                         HttpServletRequest httpRequest) {
        Long buyerId = extractBuyerIdFromRequest(httpRequest);
        if (buyerId == null || !buyerId.equals(request.getBuyerId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        BuyerCartItem savedItem = cartService.addOrUpdateCartItem(request);
        return ResponseEntity.ok(savedItem);
    }

    @GetMapping("/{buyerId}")
    public ResponseEntity<List<BuyerCartItem>> getCartItems(@PathVariable Long buyerId,
                                                            HttpServletRequest httpRequest) {
        Long tokenBuyerId = extractBuyerIdFromRequest(httpRequest);
        if (tokenBuyerId == null || !tokenBuyerId.equals(buyerId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        List<BuyerCartItem> items = cartService.getCartItems(buyerId);
        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/item/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id, HttpServletRequest httpRequest) {
        Long buyerId = extractBuyerIdFromRequest(httpRequest);
        if (buyerId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Optional<BuyerCartItem> cartItemOpt = cartService.getCartItemById(id);
        if (cartItemOpt.isEmpty() || !cartItemOpt.get().getBuyerId().equals(buyerId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        cartService.deleteCartItem(id);
        return ResponseEntity.noContent().build();
    }
}
