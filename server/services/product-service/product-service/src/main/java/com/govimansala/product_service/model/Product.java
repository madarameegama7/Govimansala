package com.govimansala.product_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name="vendor_products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    private int userId;
    private String productName;
    private String productCategory;
    private double productPrice;
    private int productQuantity;
    private String productDescription;
    private LocalDateTime createdAt = LocalDateTime.now();
}