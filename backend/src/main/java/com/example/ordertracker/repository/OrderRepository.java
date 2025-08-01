package com.example.ordertracker.repository;

import com.example.ordertracker.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    // Custom query methods can be added here
    List<Order> findByStatus(String status);
    // Example: List<Order> findByUserId(String userId);
}