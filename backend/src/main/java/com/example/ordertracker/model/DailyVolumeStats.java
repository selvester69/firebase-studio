package com.example.ordertracker.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "daily_volume_stats")
public class DailyVolumeStats {

    @Id
    private LocalDate date;
    private int ordersToShip;
    private int overdueShipments;
    private int openPOs;
    private int lateVendorShipments;

    // Getters and setters
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public int getOrdersToShip() { return ordersToShip; }
    public void setOrdersToShip(int ordersToShip) { this.ordersToShip = ordersToShip; }
    public int getOverdueShipments() { return overdueShipments; }
    public void setOverdueShipments(int overdueShipments) { this.overdueShipments = overdueShipments; }
    public int getOpenPOs() { return openPOs; }
    public void setOpenPOs(int openPOs) { this.openPOs = openPOs; }
    public int getLateVendorShipments() { return lateVendorShipments; }
    public void setLateVendorShipments(int lateVendorShipments) { this.lateVendorShipments = lateVendorShipments; }
}