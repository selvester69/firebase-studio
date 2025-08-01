package com.example.ordertracker.repository;

public class InventorySummaryDto {
    private String name;
    private Long value; // Use Long for SUM result

    public InventorySummaryDto(String name, Long value) {
        this.name = name;
        this.value = value;
    }

    // Getters

    public String getName() {
        return name;
    }

    public Long getValue() {
        return value;
    }
}