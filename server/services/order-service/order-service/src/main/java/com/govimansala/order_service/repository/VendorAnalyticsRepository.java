// order-service
package com.govimansala.order_service.repository;

import com.govimansala.order_service.model.Order;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface VendorAnalyticsRepository extends JpaRepository<Order, Integer> {

    @Query(value = """
        SELECT 
            COUNT(DISTINCT o.order_id) AS ordersPlaced,
            COALESCE(SUM(oi.quantity), 0) AS totalItems,
            COALESCE(SUM(o.total_amount), 0) AS totalRevenue,
            COUNT(DISTINCT CASE WHEN o.delivery_status IN ('OUT_FOR_DELIVERY','IN_TRANSIT') THEN o.order_id END) AS outForDelivery
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        WHERE oi.product_id IN (:productIds)
    """, nativeQuery = true)
    Map<String, Object> getSummary(@Param("productIds") List<Integer> productIds);

    @Query(value = """
        SELECT 
            TO_CHAR(DATE_TRUNC('month', o.created_at), 'Mon') AS month,
            COALESCE(SUM(o.total_amount), 0) AS total
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        WHERE oi.product_id IN (:productIds)
        GROUP BY DATE_TRUNC('month', o.created_at)
        ORDER BY DATE_TRUNC('month', o.created_at)
    """, nativeQuery = true)
    List<Map<String, Object>> getMonthlyRevenue(@Param("productIds") List<Integer> productIds);

    @Query(value = """
        SELECT 
            o.user_id AS buyerId,
            COUNT(o.order_id) AS orders,
            COALESCE(SUM(o.total_amount), 0) AS revenue
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        WHERE oi.product_id IN (:productIds)
        GROUP BY o.user_id
        ORDER BY revenue DESC
        LIMIT 3
    """, nativeQuery = true)
    List<Map<String, Object>> getTopCustomers(@Param("productIds") List<Integer> productIds);
}
