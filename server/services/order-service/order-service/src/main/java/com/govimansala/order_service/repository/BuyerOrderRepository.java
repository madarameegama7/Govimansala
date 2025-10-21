package com.govimansala.order_service.repo;

import com.govimansala.order_service.model.BuyerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BuyerOrderRepository extends JpaRepository<BuyerOrder, Long> {
    List<BuyerOrder> findByBuyerId(Long buyerId);
}

