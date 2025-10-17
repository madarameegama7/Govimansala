package com.govimansala.order_service.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "buyerOrders")
public class BuyerOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String userType;

    private String status; // e.g. PENDING, COMPLETED

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BuyerOrderItem> items;

    // Getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getBuyerId() { return userId; }
    public void setBuyerId(Long buyerId) { this.userId = buyerId; }

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
}
