package com.govimansala.order_service.service;

import com.govimansala.order_service.model.Cart;
import com.govimansala.order_service.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    // Add item to cart
    public Cart addItemToCart(Cart cart) {
        return cartRepository.save(cart);
    }
    //Checkout from cart,
    /*getOrder,
    getCartByCartId,
    getOrderByUserId,
    getAllOrderbyRestaurantId,
    getAllOrdersForAdmin,
    getOrderTotal,
    updateCartByCartId,
    deleteOrder,

     */
}
