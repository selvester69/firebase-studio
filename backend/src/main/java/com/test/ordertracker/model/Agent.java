package com.test.ordertracker.model;

import java.util.List;

public class Agent {
    private String id;
    private String name;
    private String status;
    private Location currentLocation;
    private List<String> assignedOrders;

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Location getCurrentLocation() {
        return currentLocation;
    }

    public void setCurrentLocation(Location currentLocation) {
        this.currentLocation = currentLocation;
    }

    public List<String> getAssignedOrders() {
        return assignedOrders;
    }

    public void setAssignedOrders(List<String> assignedOrders) {
        this.assignedOrders = assignedOrders;
    }
}
