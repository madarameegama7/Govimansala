package com.govimansala.order_service.service;

import java.util.List;

public record PagedResponse<T>(
        List<T> data,
        int page,
        int pageSize,
        long total
) {}

