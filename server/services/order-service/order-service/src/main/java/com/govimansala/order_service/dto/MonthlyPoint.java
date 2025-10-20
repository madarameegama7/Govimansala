package com.govimansala.order_service.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyPoint {
    private String month;  // "Jan", "Feb", etc.
    private int value;     // total sales or count per month
}
