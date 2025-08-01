package com.example.ordertracker.controller;

import com.example.ordertracker.model.Order;
import com.example.ordertracker.model.User;
import com.example.ordertracker.model.DailyVolumeStats;
import com.example.ordertracker.model.MonthlyKpi;
import com.example.ordertracker.model.FinancialData; // Import FinancialData entity
import com.example.ordertracker.repository.InventoryItemRepository;
import com.example.ordertracker.repository.InventorySummaryDto;
import com.example.ordertracker.repository.OrderRepository;
import com.example.ordertracker.repository.UserRepository;
import com.example.ordertracker.repository.DailyVolumeStatsRepository;
import com.example.ordertracker.repository.MonthlyKpiRepository;
import com.example.ordertracker.repository.FinancialDataRepository; // Import FinancialDataRepository

import com.example.ordertracker.model.VolumeStat;
// import com.example.ordertracker.model.MonthlyKPI; // Import frontend MonthlyKPI type if needed for mapping
// import com.example.ordertracker.model.FinancialDataPoint; // Import frontend FinancialDataPoint type if needed for mapping

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.time.YearMonth;

@RestController
@RequestMapping("/api/mock") // Assuming this is your base path
public class DashboardController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InventoryItemRepository inventoryItemRepository;

    @Autowired
    private DailyVolumeStatsRepository dailyVolumeStatsRepository;

    @Autowired
    private MonthlyKpiRepository monthlyKpiRepository;

    @Autowired
    private FinancialDataRepository financialDataRepository; // Inject FinancialDataRepository

    @GetMapping("/orders/all")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/orders/backordered")
    public List<Order> getBackorderedOrders() {
        return orderRepository.findByStatus("Backordered");
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/inventory/summary")
    public List<InventorySummaryDto> getInventorySummary() {
        return inventoryItemRepository.countInventoryByCategory();
    }

    @GetMapping("/dashboard/volume-stats")
    public List<VolumeStat> getVolumeStats() {
        Optional<DailyVolumeStats> latestStats = dailyVolumeStatsRepository.findTopByOrderByDateDesc();

        if (latestStats.isPresent()) {
            DailyVolumeStats stats = latestStats.get();
            // Map the entity data to the frontend's VolumeStat structure
            List<VolumeStat> volumeStats = new ArrayList<>();
            volumeStats.add(new VolumeStat("vol1", "Orders To Ship", stats.getOrdersToShip(), null, null, "text-yellow-500"));
            volumeStats.add(new VolumeStat("vol2", "Overdue Shipments", stats.getOverdueShipments(), null, null, "text-green-500"));
            volumeStats.add(new VolumeStat("vol3", "Open POs", stats.getOpenPOs(), null, null, "text-yellow-500"));
            volumeStats.add(new VolumeStat("vol4", "Late Vendor Shipments", stats.getLateVendorShipments(), null, null, "text-green-500"));
            return volumeStats;
        } else {
            return java.util.Collections.emptyList(); // Or return a default/empty state
        }
    }

    @GetMapping("/dashboard/monthly-kpis")
    public List<MonthlyKpi> getMonthlyKpis() {
        YearMonth currentMonth = YearMonth.now();
        return monthlyKpiRepository.findByMonth(currentMonth);
    }

    @GetMapping("/financial/performance")
    public List<FinancialData> getFinancialPerformance() {
        return financialDataRepository.findAll();
    }

}