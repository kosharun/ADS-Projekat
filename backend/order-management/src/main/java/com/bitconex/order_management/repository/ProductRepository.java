package com.bitconex.order_management.repository;

import com.bitconex.order_management.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);
    List<Product> findAllByAvailableTrue();

    Long countByAvailableTrue();
}
