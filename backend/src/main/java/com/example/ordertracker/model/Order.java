package com.example.ordertracker.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    private String id;
    private String userId;
    private String customerName;
    private String status; // You might want an Enum for status
    private Instant orderDate; // Using Instant for date-time
    private Instant eta; // Using Instant for date-time
    
    @ElementCollection
    private List<String> items;

    @Embedded
    private Location currentLocation;

    private String destinationAddress;

    // Assuming status history is stored separately or serialized
    // private List<OrderStatusEvent> statusHistory; 

    private String deliveryAgentId;
    private Double totalAmount;

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Instant orderDate) {
        this.orderDate = orderDate;
    }

    public Instant getEta() {
        return eta;
    }

    public void setEta(Instant eta) {
        this.eta = eta;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }

    public Location getCurrentLocation() {
        return currentLocation;
    }

    public void setCurrentLocation(Location currentLocation) {
        this.currentLocation = currentLocation;
    }

    public String getDestinationAddress() {
        return destinationAddress;
    }

    public void setDestinationAddress(String destinationAddress) {
        this.destinationAddress = destinationAddress;
    }

    public String getDeliveryAgentId() {
        return deliveryAgentId;
    }

    public void setDeliveryAgentId(String deliveryAgentId) {
        this.deliveryAgentId = deliveryAgentId;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    // Embedded Location class
    @Embeddable
    public static class Location {
        private double lat;
        private double lng;
        private String address;

        // Getters and setters for Location

        public double getLat() {
            return lat;
        }

        public void setLat(double lat) {
            this.lat = lat;
        }

        public double getLng() {
            return lng;
        }

        public void setLng(double lng) {
            this.lng = lng;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }
    }

}
