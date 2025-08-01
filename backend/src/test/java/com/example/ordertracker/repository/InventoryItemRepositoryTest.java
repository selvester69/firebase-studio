package com.example.ordertracker.repository;

import com.example.ordertracker.model.InventoryItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@DataJpaTest
public class InventoryItemRepositoryTest {

    @Autowired
    private InventoryItemRepository inventoryItemRepository;

    @Autowired
    private TestEntityManager entityManager;

    private InventoryItem item1;
    private InventoryItem item2;
    private InventoryItem item3;

    @BeforeEach
    void setUp() {
        // Clear the database before each test
        inventoryItemRepository.deleteAll();

        // Create and persist sample inventory items
        item1 = new InventoryItem();
        item1.setId("INV001");
        item1.setCategory("Electronics");
        item1.setProduct("Laptop");
        item1.setSku("SKU001");
        item1.setInStock(10);

        item2 = new InventoryItem();
        item2.setId("INV002");
        item2.setCategory("Electronics");
        item2.setProduct("Keyboard");
        item2.setSku("SKU002");
        item2.setInStock(25);

        item3 = new InventoryItem();
        item3.setId("INV003");
        item3.setCategory("Appliances");
        item3.setProduct("Microwave");
        item3.setSku("SKU003");
        item3.setInStock(15);

        entityManager.persist(item1);
        entityManager.persist(item2);
        entityManager.persist(item3);
        entityManager.flush();
    }

    @Test
    void testFindAll() {
        List<InventoryItem> items = inventoryItemRepository.findAll();
        assertThat(items).hasSize(3);
        assertThat(items).containsExactlyInAnyOrder(item1, item2, item3);
    }

    @Test
    void testFindById() {
        Optional<InventoryItem> foundItem = inventoryItemRepository.findById("INV001");
        assertThat(foundItem).isPresent();
        assertThat(foundItem.get().getProduct()).isEqualTo("Laptop");
    }

    @Test
    void testCountInventoryByCategory() {
        List<InventorySummaryDto> summary = inventoryItemRepository.countInventoryByCategory();

        assertThat(summary).hasSize(2);

        // Assert details for each category
        assertAll(
            () -> assertThat(summary).anyMatch(dto -> dto.getName().equals("Electronics") && dto.getValue() == 35L),
            () -> assertThat(summary).anyMatch(dto -> dto.getName().equals("Appliances") && dto.getValue() == 15L)
        );
    }

    @Test
    void testDeleteInventoryItem() {
        inventoryItemRepository.deleteById("INV001");
        Optional<InventoryItem> deletedItem = inventoryItemRepository.findById("INV001");
        assertThat(deletedItem).isNotPresent();
    }
}