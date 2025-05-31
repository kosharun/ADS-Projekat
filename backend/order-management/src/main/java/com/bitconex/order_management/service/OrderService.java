    package com.bitconex.order_management.service;

    import com.bitconex.order_management.dto.OrderDTO;
    import com.bitconex.order_management.dto.OrderRequestDTO;
    import com.bitconex.order_management.entity.*;
    import com.bitconex.order_management.mapper.DTOMapper;
    import com.bitconex.order_management.repository.OrderRepository;
    import com.bitconex.order_management.repository.ProductRepository;
    import com.bitconex.order_management.repository.UserRepository;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;
    import org.springframework.validation.ObjectError;

    import java.math.BigDecimal;
    import java.time.LocalDate;
    import java.util.*;

    import static com.bitconex.order_management.utils.ConsoleUtil.printSuccess;

    @Service
    public class OrderService {

        private final OrderRepository orderRepository;
        private final DTOMapper dtoMapper;
        private final UserRepository userRepository;
        private final OrderStatusService orderStatusService;
        private final ProductRepository productRepository;

        public OrderService(OrderRepository orderRepository, DTOMapper dtoMapper, UserRepository userRepository, OrderStatusService orderStatusService, ProductRepository productRepository) {
            this.orderRepository = orderRepository;
            this.dtoMapper = dtoMapper;
            this.userRepository = userRepository;
            this.orderStatusService = orderStatusService;
            this.productRepository = productRepository;
        }


        public List<OrderDTO> getAllOrders() {
            List<OrderDTO> orderDTOS = new ArrayList<>();
            List<Order> orders = orderRepository.findAll();

            for (Order order : orders) {
                orderDTOS.add(dtoMapper.mapToDTO(order));
            }

            return orderDTOS;
        }

        //get all orders by userid
        public List<OrderDTO> getAllOrdersByUserId(Long userId) {
            List<OrderDTO> orderDTOS = new ArrayList<>();
            User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
            List<Order> orders = orderRepository.findAllByUser(user);

            for (Order order : orders) {
                orderDTOS.add(dtoMapper.mapToDTO(order));
            }

            return orderDTOS;
        }

        public Order getOrderById(Long Id)  {
            return orderRepository.findById(Id).orElseThrow(() -> new RuntimeException("Cannot find order"));
        }

        public Map<String, Long> countOrdersByStatus() {
            Map<String, Long> counts = new HashMap<>();
            counts.put("Pending", orderRepository.countByStatus_NameIgnoreCase("Pending"));
            counts.put("Completed", orderRepository.countByStatus_NameIgnoreCase("Completed"));
            counts.put("Cancelled", orderRepository.countByStatus_NameIgnoreCase("Cancelled"));
            return counts;
        }

        public BigDecimal calculateTotalRevenueFromCompletedOrders() {
            List<Order> completedOrders = orderRepository.findAllByStatus_NameIgnoreCase("Completed");
            return completedOrders.stream()
                    .map(order -> BigDecimal.valueOf(order.getTotalPrice()))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        }



        @Transactional
        public OrderDTO createOrder(OrderRequestDTO orderRequestDTO) {

            Long userId = orderRequestDTO.getUserId();
            if (userId == null) {
                throw new IllegalArgumentException("User ID is required");
            }
            LocalDate createdAt = LocalDate.now();

            User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

            Optional<OrderStatus> status = orderStatusService.getOrderStatusByNameIgnoreCase("Pending");

            Order order = Order.builder()
                    .user(user)
                    .status(status.get())
                    .totalPrice(orderRequestDTO.getTotalPrice())
                    .createdAt(createdAt)
                    .build();
            return dtoMapper.mapToDTO(orderRepository.save(order));
        }

        public void updateOrderStatus(Order order, String status) {
            OrderStatus orderStatus = orderStatusService.getOrderStatusByNameIgnoreCase(status)
                    .orElseThrow(() -> new RuntimeException("Status not found: " + status));
            order.setStatus(orderStatus);
            orderRepository.save(order);
            printSuccess("Successfully updated order status to: " + status);
        }

        @Transactional
        public void cancelOrder(Long orderId) {
            Order order = orderRepository.findById(orderId).orElseThrow(() -> new IllegalArgumentException("Order not found"));
            OrderStatus orderStatus = orderStatusService.getOrderStatusByNameIgnoreCase("Cancelled")
                    .orElseThrow(() -> new RuntimeException("Status not found: Cancelled"));

            for (OrderItem item : order.getOrderItems()) {
                Product product = item.getProduct();
                product.setStockQuantity(product.getStockQuantity() + item.getQuantity());

                productRepository.save(product);
            }


            order.setStatus(orderStatus);
            orderRepository.save(order);
            printSuccess("Successfully cancelled order with ID: " + orderId);
        }

    }
