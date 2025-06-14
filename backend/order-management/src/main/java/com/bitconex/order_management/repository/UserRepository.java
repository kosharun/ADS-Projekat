package com.bitconex.order_management.repository;

import com.bitconex.order_management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Long countByRole_NameIgnoreCase(String roleName);
}
