package com.bitconex.order_management.repository;

import com.bitconex.order_management.entity.Order;
import com.bitconex.order_management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUser(User user);

    Long countByStatus_NameIgnoreCase(String pending);

    List<Order> findAllByStatus_NameIgnoreCase(String completed);
}
