package com.bitconex.order_management.controller;

import com.bitconex.order_management.service.OrderService;
import com.bitconex.order_management.service.ProductService;
import com.bitconex.order_management.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/admin/analytics")
public class AnalyticsController {

    private final UserService userService;
    private final OrderService orderService;
    private final ProductService productService;

    public AnalyticsController(UserService userService, OrderService orderService, ProductService productService) {
        this.userService = userService;
        this.orderService = orderService;
        this.productService = productService;
    }

    @GetMapping("/user-count")
    public ResponseEntity<Long> getUserCount() {
        return ResponseEntity.ok(userService.countUsersWithRole("USER"));
    }

    @GetMapping("/order-status-counts")
    public ResponseEntity<Map<String, Long>> getOrderStatusCounts() {
        return ResponseEntity.ok(orderService.countOrdersByStatus());
    }

    @GetMapping("/total-revenue")
    public ResponseEntity<BigDecimal> getTotalRevenueFromCompletedOrders() {
        return ResponseEntity.ok(orderService.calculateTotalRevenueFromCompletedOrders());
    }

    @GetMapping("/available-products-count")
    public ResponseEntity<Long> getAvailableProductsCount() {
        return ResponseEntity.ok(productService.countAvailableProducts());
    }
}
