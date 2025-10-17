package com.govimansala.order_service.service;

import com.govimansala.order_service.dto.BuyerOrderRequest;
import com.govimansala.order_service.dto.BuyerOrderItemRequest;
import com.govimansala.order_service.model.BuyerOrder;
import com.govimansala.order_service.model.BuyerOrderItem;
import com.govimansala.order_service.repo.BuyerOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BuyerOrderService {

    @Autowired
    private BuyerOrderRepository orderRepository;

    public BuyerOrder placeOrder(BuyerOrderRequest orderRequest) {
        BuyerOrder order = new BuyerOrder();
        order.setBuyerId(orderRequest.getBuyerId());
        order.setStatus("PENDING");

        List<BuyerOrderItem> items = new ArrayList<>();
        for (BuyerOrderItemRequest itemRequest : orderRequest.getItems()) {
            BuyerOrderItem item = new BuyerOrderItem();
            item.setProductId(itemRequest.getProductId());
            item.setQuantity(itemRequest.getQuantity());
            item.setPrice(itemRequest.getPrice());
            item.setOrder(order); // link item to order
            items.add(item);
        }
        order.setItems(items);

        return orderRepository.save(order);
    }
}
