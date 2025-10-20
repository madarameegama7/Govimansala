package com.govimansala.order_service.dto;

import java.util.List;

public class BuyerOrderRequest {
    private Long buyerId;
    private List<BuyerOrderItemRequest> items;

    public Long getBuyerId() { return buyerId; }
    public void setBuyerId(Long buyerId) { this.buyerId = buyerId; }

    public List<BuyerOrderItemRequest> getItems() { return items; }
    public void setItems(List<BuyerOrderItemRequest> items) { this.items = items; }
}
