package com.example.ordertracker.repository;

import com.example.ordertracker.model.FinancialData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialDataRepository extends JpaRepository<FinancialData, String> {
    // Custom query methods can be added here if needed
}