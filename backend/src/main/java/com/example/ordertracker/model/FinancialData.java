package com.example.ordertracker.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "financial_data")
public class FinancialData {
    @Id
    private String region;
    private double cashToCashTime;
    private double accountRecDay;
    private double inventoryDays;
    private double accountsPayableDays;

    // Getters and setters

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public double getCashToCashTime() {
        return cashToCashTime;
    }

    public void setCashToCashTime(double cashToCashTime) {
        this.cashToCashTime = cashToCashTime;
    }

    public double getAccountRecDay() {
        return accountRecDay;
    }

    public void setAccountRecDay(double accountRecDay) {
        this.accountRecDay = accountRecDay;
    }

    public double getInventoryDays() {
        return inventoryDays;
    }

    public void setInventoryDays(double inventoryDays) {
        this.inventoryDays = inventoryDays;
    }

    public double getAccountsPayableDays() {
        return accountsPayableDays;
    }

    public void setAccountsPayableDays(double accountsPayableDays) {
        this.accountsPayableDays = accountsPayableDays;
    }
}