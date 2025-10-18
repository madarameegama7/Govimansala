package com.govimansala.order_service.repository;

import java.sql.Timestamp;

public interface VendorOrderRow {
    Integer getOrderId();
    Integer getUserId();
    String  getOrderStatus();
    String  getDeliveryStatus();
    Double  getTotalAmount();
    Timestamp getCreatedAt();
    String  getUiStatus();
}
