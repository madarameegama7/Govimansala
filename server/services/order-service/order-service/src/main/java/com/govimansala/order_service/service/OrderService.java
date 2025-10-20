package com.govimansala.order_service.service;

import com.govimansala.order_service.enums.OrderStatus;
import com.govimansala.order_service.model.*;
import com.govimansala.order_service.repository.CartRepository;
import com.govimansala.order_service.repository.CartItemRepository;
import com.govimansala.order_service.repository.OrderRepository;
import com.govimansala.order_service.repository.VendorOrderRow;
import com.govimansala.order_service.dto.response.ProductResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.ZoneOffset;
import java.util.*;

@Service
public class OrderService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final RestTemplate plainRestTemplate; // for Gateway URLs
    private final RestTemplate lbRestTemplate;     // for serviceId calls

    @Value("${products.base-url:http://product-service}")
    private String productsBaseUrl;

    @Autowired
    public OrderService(
            @Qualifier("plainRestTemplate") RestTemplate plainRestTemplate,
            @Qualifier("lbRestTemplate") RestTemplate lbRestTemplate,
            CartRepository cartRepository,
            OrderRepository orderRepository,
            CartItemRepository cartItemRepository
    ) {
        this.plainRestTemplate = plainRestTemplate;
        this.lbRestTemplate = lbRestTemplate;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.cartItemRepository = cartItemRepository;
    }

    // --- CHECKOUT & ORDER CREATION ---
    public Order checkoutCart(int cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isEmpty()) {
            throw new RuntimeException("Cart not found with ID: " + cartId);
        }

        Cart cart = optionalCart.get();
        List<CartItem> cartItems = cartItemRepository.findByCart_CartId(cartId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty.");
        }

        return placeOrder(cartItems);
    }

    public Order placeOrder(List<CartItem> cartItems) {
        Order order = new Order();
        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0.0;

        // Use the service name (Eureka discovery)
        String productServiceUrl = "http://product-service/api/product/id/";

        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(cartItem.getProductId());
            orderItem.setQuantity(cartItem.getQuantity());

            try {
                ProductResponseDTO product = lbRestTemplate.getForObject(
                        productServiceUrl + cartItem.getProductId(),
                        ProductResponseDTO.class
                );
                System.out.println("Fetched product: " + product);

                if (product != null) {
                    double unitPrice = product.getProductPrice();
                    orderItem.setUnitPrice(unitPrice);
                    total += unitPrice * orderItem.getQuantity();
                } else {
                    orderItem.setUnitPrice(0.0);
                }
            } catch (Exception e) {
                e.printStackTrace();
                orderItem.setUnitPrice(0.0);
            }

            orderItem.setOrder(order);
            orderItem.setOrderStatus(OrderStatus.PENDING);
            orderItems.add(orderItem);
        }

        order.setOrderItems(orderItems);
        order.setTotal(total);
        order.setOrderStatus(OrderStatus.PENDING);

        return orderRepository.save(order);
    }

    // --- FETCH ORDERS FOR VENDOR ---
    public PagedResponse<OrderListItem> getVendorOrders(
            int vendorUserId, String status, String q, int page, int pageSize) {

        // 1) Ask product-service for this vendor's product IDs
        String url = productsBaseUrl + "/api/product/vendor/{id}/ids";
        Integer[] productIds = lbRestTemplate.getForObject(url, Integer[].class, vendorUserId);

        if (productIds == null || productIds.length == 0) {
            return new PagedResponse<>(List.of(), page, pageSize, 0);
        }

        // 2) Normalize filters
        String statusUi = switch (status == null ? "" : status.trim()) {
            case "Placed", "Out for Delivery", "Delivered", "Returned" -> status.trim();
            case "" -> null;
            default -> null;
        };
        String qNorm = (q == null || q.isBlank()) ? null : q.trim();

        int safePage = Math.max(1, page);
        int safePageSize = Math.max(1, pageSize);
        int offset = (safePage - 1) * safePageSize;

        // 3) Query DB via repository
        List<VendorOrderRow> rows = orderRepository.findVendorOrders(productIds, statusUi, qNorm, offset, safePageSize);
        long total = orderRepository.countVendorOrders(productIds, statusUi, qNorm);

        // 4) Map to DTOs
        List<OrderListItem> items = rows.stream().map(r -> new OrderListItem(
                r.getOrderId(),
                r.getUserId(),
                r.getOrderStatus(),
                r.getDeliveryStatus(),
                r.getTotalAmount(),
                r.getCreatedAt().toInstant().atOffset(ZoneOffset.UTC).toInstant(),
                r.getUiStatus()
        )).toList();

        return new PagedResponse<>(items, safePage, safePageSize, total);
    }
}
