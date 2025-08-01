package com.test.ordertracker.model;

public class MonthlyKpisData {
    private int orders;
    private double revenue;
    private int ontimeDelivery;

    // Getters and setters
    public int getOrders() {
        return orders;
    }

    public void setOrders(int orders) {
        this.orders = orders;
    }

    public double getRevenue() {
        return revenue;
    }

    public void setRevenue(double revenue) {
        this.revenue = revenue;
    }

    public int getOntimeDelivery() {
        return ontimeDelivery;
    }

    public void setOntimeDelivery(int ontimeDelivery) {
        this.ontimeDelivery = ontimeDelivery;
    }
}
