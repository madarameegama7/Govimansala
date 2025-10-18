package com.govimansala.order_service.model;
import com.govimansala.order_service.enums.DeliveryStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "buyer_orders")
public class BuyerOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long buyerId;

    private String status; //

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BuyerOrderItem> items;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;

    // Getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getBuyerId() { return buyerId; }
    public void setBuyerId(Long buyerId) { this.buyerId = buyerId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<BuyerOrderItem> getItems() { return items; }
    public void setItems(List<BuyerOrderItem> items) {
        this.items = items;
        if(items != null) {
            for (BuyerOrderItem item : items) {
                item.setOrder(this);
            }
        }
    }

    public DeliveryStatus getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(DeliveryStatus deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }
}
