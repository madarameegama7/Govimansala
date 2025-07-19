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

            //set cart reference for each cartItem
            if(cart.getItems() != null){
                for(CartItem item : cart.getItems()){
                    item.setCart(cart);
                }
            }
            return ResponseEntity.ok(cartService.addItemToCart(cart));
        }
        return ResponseEntity.badRequest().build();
    }
}