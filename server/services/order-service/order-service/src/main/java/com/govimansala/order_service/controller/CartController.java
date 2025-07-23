package com.govimansala.order_service.controller;

import com.govimansala.order_service.model.Cart;
import com.govimansala.order_service.model.CartItem;
import com.govimansala.order_service.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import com.govimansala.order_service.security.JwtUtil;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final JwtUtil jwtUtil;

    @PostMapping("/addtoCart")
    public ResponseEntity<Cart> addItemToCart(@RequestBody Cart cart, HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            String userId = jwtUtil.extractUserId(token);
            cart.setUserId(Integer.parseInt(userId));

            // Set the cart reference for each cart item
            if (cart.getItems() != null) {
                for (CartItem item : cart.getItems()) {
                    item.setCart(cart);
                }
            }

            try {
                Cart updatedCart = cartService.addItemToCart(cart); // This should handle both create/update
                return ResponseEntity.ok(updatedCart);
            } catch (Exception e) {
                e.printStackTrace(); // ✅ Logs the error in terminal (VS Code)
                return ResponseEntity.internalServerError().build();
            }
        }

        return ResponseEntity.badRequest().build();
    }



    @GetMapping("/getCartByCartId/{cartId}")
    public ResponseEntity<Cart> getCartByCartId(@PathVariable int cartId) {
        return cartService.getCartByCartId(cartId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/getCartByUserId/{userId}")
    public ResponseEntity<List<Cart>> getCartByUserId(@PathVariable int userId) {
        List<Cart> carts = cartService.getCartByUserId(userId);
        if (carts.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(carts); // 200 OK with list
    }



}