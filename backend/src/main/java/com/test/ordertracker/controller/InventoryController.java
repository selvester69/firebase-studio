package com.test.ordertracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @GetMapping
    public List<String> getAllInventoryItems() {
        // TODO: Implement logic to fetch all inventory items from a data source
        List<String> inventoryItems = new ArrayList<>();
        inventoryItems.add("Item A");
        inventoryItems.add("Item B");
        return inventoryItems;
    }

    @GetMapping("/{itemId}")
    public String getInventoryItemById(@PathVariable String itemId) {
        // TODO: Implement logic to fetch inventory item details by ID from a data source
        return "Details for inventory item " + itemId;
    }
}
