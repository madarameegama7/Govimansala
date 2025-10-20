package com.govimansala.order_service.service;

import java.time.Instant;

public record OrderListItem(
        Integer orderId,
        Integer userId,
        String  orderStatus,
        String  deliveryStatus,
        Double  totalAmount,
        Instant createdAt,
        String  uiStatus
) {}
