package com.test.ordertracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping("/financial-performance")
    public Map<String, Object> getFinancialPerformanceData() {
        // TODO: Implement logic to fetch financial performance data
        Map<String, Object> data = new HashMap<>();
        data.put("labels", new String[]{"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"});
        data.put("data", new Double[]{65.0, 59.0, 80.0, 81.0, 56.0, 55.0, 40.0});
        return data;
    }

    @GetMapping("/volume-today")
    public Map<String, Object> getVolumeTodayData() {
        // TODO: Implement logic to fetch volume today data
        Map<String, Object> data = new HashMap<>();
        data.put("volume", 1234);
        return data;
    }

    @GetMapping("/monthly-kpis")
    public Map<String, Object> getMonthlyKpisData() {
        // TODO: Implement logic to fetch monthly KPIs data
        Map<String, Object> data = new HashMap<>();
        data.put("orders", 500);
        data.put("revenue", 15000);
        data.put("ontimeDelivery", 95);
        return data;
    }

    @GetMapping("/inventory-summary")
    public Map<String, Object> getInventorySummaryData() {
        // TODO: Implement logic to fetch inventory summary data
        Map<String, Object> data = new HashMap<>();
        data.put("inStock", 1000);
        data.put("lowStock", 50);
        data.put("outOfStock", 10);
        return data;
    }
}
