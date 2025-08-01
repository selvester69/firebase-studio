package com.test.ordertracker.model;

public class InventorySummaryData {
    private int inStock;
    private int lowStock;
    private int outOfStock;

    // Getters and setters
    public int getInStock() {
        return inStock;
    }

    public void setInStock(int inStock) {
        this.inStock = inStock;
    }

    public int getLowStock() {
        return lowStock;
    }

    public void setLowStock(int lowStock) {
        this.lowStock = lowStock;
    }

    public int getOutOfStock() {
        return outOfStock;
    }

    public void setOutOfStock(int outOfStock) {
        this.outOfStock = outOfStock;
    }
}
