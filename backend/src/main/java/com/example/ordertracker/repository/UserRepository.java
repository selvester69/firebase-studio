package com.example.ordertracker.repository;

import com.example.ordertracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Custom query methods can be added here
}