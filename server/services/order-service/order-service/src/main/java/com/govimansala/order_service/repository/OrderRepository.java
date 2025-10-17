package com.govimansala.order_service.repository;

import com.govimansala.order_service.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    // existing finder (keep it)
    List<Order> findByUserId(int userId);

    // NEW: vendor-scoped orders (paged)
    @Query(value = """
        WITH mapped AS (
          SELECT
            o.order_id,
            o.user_id,
            o.order_status,
            o.delivery_status,
            o.total_amount,
            o.created_at,
            CASE
              WHEN UPPER(COALESCE(o.delivery_status,'')) = 'DELIVERED' THEN 'Delivered'
              WHEN UPPER(COALESCE(o.delivery_status,'')) IN ('OUT_FOR_DELIVERY','OUT FOR DELIVERY','SHIPPED') THEN 'Out for Delivery'
              WHEN UPPER(COALESCE(o.order_status,'')) = 'RETURNED' THEN 'Returned'
              WHEN UPPER(COALESCE(o.order_status,'')) IN ('PENDING','PLACED','') THEN 'Placed'
              ELSE 'Placed'
            END AS ui_status
          FROM public.orders o
          WHERE EXISTS (
            SELECT 1
            FROM public.order_items oi
            WHERE oi.order_id = o.order_id
              AND oi.product_id = ANY (:productIds)
          )
        ),
        filtered AS (
          SELECT *
          FROM mapped m
          WHERE (:statusUi IS NULL OR m.ui_status = :statusUi)
            AND (
              :q IS NULL
              OR LPAD(m.order_id::text, 5, '0') ILIKE '%' || REGEXP_REPLACE(:q,'[^0-9]','','g') || '%'
              OR TO_CHAR(m.created_at::date,'YYYY-MM-DD') = :q
            )
        )
        SELECT
          order_id        AS orderId,
          user_id         AS userId,
          order_status    AS orderStatus,
          delivery_status AS deliveryStatus,
          total_amount    AS totalAmount,
          created_at      AS createdAt,
          ui_status       AS uiStatus
        FROM filtered
        ORDER BY created_at DESC
        OFFSET :offset LIMIT :limit
        """, nativeQuery = true)
    List<VendorOrderRow> findVendorOrders(
            @Param("productIds") Integer[] productIds,
            @Param("statusUi") String statusUi,   // 'Placed' | 'Out for Delivery' | 'Delivered' | 'Returned' or null
            @Param("q") String q,                 // order# fragment or YYYY-MM-DD, or null
            @Param("offset") int offset,
            @Param("limit")  int limit
    );

    // NEW: total count for pagination
    @Query(value = """
        WITH mapped AS (
          SELECT
            o.order_id,
            CASE
              WHEN UPPER(COALESCE(o.delivery_status,'')) = 'DELIVERED' THEN 'Delivered'
              WHEN UPPER(COALESCE(o.delivery_status,'')) IN ('OUT_FOR_DELIVERY','OUT FOR DELIVERY','SHIPPED') THEN 'Out for Delivery'
              WHEN UPPER(COALESCE(o.order_status,'')) = 'RETURNED' THEN 'Returned'
              WHEN UPPER(COALESCE(o.order_status,'')) IN ('PENDING','PLACED','') THEN 'Placed'
              ELSE 'Placed'
            END AS ui_status,
            o.created_at
          FROM public.orders o
          WHERE EXISTS (
            SELECT 1
            FROM public.order_items oi
            WHERE oi.order_id = o.order_id
              AND oi.product_id = ANY (:productIds)
          )
        ),
        filtered AS (
          SELECT *
          FROM mapped m
          WHERE (:statusUi IS NULL OR m.ui_status = :statusUi)
            AND (
              :q IS NULL
              OR LPAD(m.order_id::text, 5, '0') ILIKE '%' || REGEXP_REPLACE(:q,'[^0-9]','','g') || '%'
              OR TO_CHAR(m.created_at::date,'YYYY-MM-DD') = :q
            )
        )
        SELECT COUNT(*) FROM filtered
        """, nativeQuery = true)
    long countVendorOrders(
            @Param("productIds") Integer[] productIds,
            @Param("statusUi") String statusUi,
            @Param("q") String q
    );
}

