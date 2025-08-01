package com.example.ordertracker.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.YearMonth;

@Entity
@Table(name = "monthly_kpis")
public class MonthlyKpi {

    @Id
    private String id; // Or a composite key if needed
    private YearMonth month;
    private String metric;
    private double thisMonthValue;
    private String thisMonthDisplay;
    private double pastMonthValue;
    private String pastMonthDisplay;
    private double changeValue;
    private String changeDisplay;
    // Assuming past30DaysData is stored as a JSON string or in a related table
    // private String past30DaysDataJson;

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public YearMonth getMonth() {
        return month;
    }

    public void setMonth(YearMonth month) {
        this.month = month;
    }

    public String getMetric() {
        return metric;
    }

    public void setMetric(String metric) {
        this.metric = metric;
    }

    public double getThisMonthValue() {
        return thisMonthValue;
    }

    public void setThisMonthValue(double thisMonthValue) {
        this.thisMonthValue = thisMonthValue;
    }

    public String getThisMonthDisplay() {
        return thisMonthDisplay;
    }

    public void setThisMonthDisplay(String thisMonthDisplay) {
        thisMonthDisplay = thisMonthDisplay;
    }

    public double getPastMonthValue() {
        return pastMonthValue;
    }

    public void setPastMonthValue(double pastMonthValue) {
        this.pastMonthValue = pastMonthValue;
    }

    public String getPastMonthDisplay() {
        return pastMonthDisplay;
    }

    public void setPastMonthDisplay(String pastMonthDisplay) {
        this.pastMonthDisplay = pastMonthDisplay;
    }

    public double getChangeValue() {
        return changeValue;
    }

    public void setChangeValue(double changeValue) {
        this.changeValue = changeValue;
    }

    public String getChangeDisplay() {
        return changeDisplay;
    }

    public void setChangeDisplay(String changeDisplay) {
        this.changeDisplay = changeDisplay;
    }
}