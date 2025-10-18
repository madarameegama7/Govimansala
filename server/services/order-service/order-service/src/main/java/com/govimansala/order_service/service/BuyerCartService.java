package com.govimansala.order_service.service;

import com.govimansala.order_service.dto.BuyerCartItemRequest;
import com.govimansala.order_service.model.BuyerCartItem;
import com.govimansala.order_service.repository.BuyerCartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BuyerCartService {

    @Autowired
    private BuyerCartItemRepository repository;

    // Add or update cart item
    public BuyerCartItem addOrUpdateCartItem(BuyerCartItemRequest request) {
        Optional<BuyerCartItem> existingItem = repository.findByBuyerIdAndProductId(request.getBuyerId(), request.getProductId());

        BuyerCartItem item;
        if (existingItem.isPresent()) {
            item = existingItem.get();
            item.setQuantity(request.getQuantity());
            item.setPrice(request.getPrice());
        } else {
            item = new BuyerCartItem();
            item.setBuyerId(request.getBuyerId());
            item.setProductId(request.getProductId());
            item.setQuantity(request.getQuantity());
            item.setPrice(request.getPrice());
        }
        return repository.save(item);
    }

    public List<BuyerCartItem> getCartItems(Long buyerId) {
        return repository.findByBuyerId(buyerId);
    }

    public void deleteCartItem(Long cartItemId) {
        repository.deleteById(cartItemId);
    }
}
