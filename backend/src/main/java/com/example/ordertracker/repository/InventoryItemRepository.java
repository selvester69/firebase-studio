package com.example.ordertracker.repository;

import com.example.ordertracker.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, String> {
    // Custom query methods can be added here
    // Example: List<InventoryItem> findByCategory(String category);

    @Query("SELECT new com.example.ordertracker.repository.InventorySummaryDto(i.category, SUM(i.inStock)) FROM InventoryItem i GROUP BY i.category")
    List<InventorySummaryDto> countInventoryByCategory();
}
