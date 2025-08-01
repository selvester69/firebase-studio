package com.example.ordertracker.controller;

import com.example.ordertracker.model.Order;
import com.example.ordertracker.model.User;
import com.example.ordertracker.repository.InventoryItemRepository;
import com.example.ordertracker.repository.OrderRepository;
import com.example.ordertracker.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DashboardController.class)
public class DashboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderRepository orderRepository;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private InventoryItemRepository inventoryItemRepository;

    // You would also need MockBeans for other repositories used in the controller
    // @MockBean
    // private DailyVolumeStatsRepository dailyVolumeStatsRepository;
    // @MockBean
    // private MonthlyKpiRepository monthlyKpiRepository;
    // @MockBean
    // private FinancialDataRepository financialDataRepository;

    @Test
    void testGetAllOrders() throws Exception {
        Order order1 = new Order();
        order1.setId("ORD001");
        order1.setCustomerName("Alice");

        Order order2 = new Order();
        order2.setId("ORD002");
        order2.setCustomerName("Bob");

        List<Order> allOrders = Arrays.asList(order1, order2);

        when(orderRepository.findAll()).thenReturn(allOrders);

        mockMvc.perform(get("/api/mock/orders/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").isEqualTo("ORD001"))
                .andExpect(jsonPath("$[1].customerName").isEqualTo("Bob"));
    }

    @Test
    void testGetBackorderedOrders() throws Exception {
        Order backorderedOrder = new Order();
        backorderedOrder.setId("ORD002");
        backorderedOrder.setStatus("Backordered");

        List<Order> backorderedOrders = Arrays.asList(backorderedOrder);

        when(orderRepository.findByStatus("Backordered")).thenReturn(backorderedOrders);

        mockMvc.perform(get("/api/mock/orders/backordered"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").isEqualTo("ORD002"))
                .andExpect(jsonPath("$[0].status").isEqualTo("Backordered"));
    }

    @Test
    void testGetAllUsers() throws Exception {
        User user1 = new User();
        user1.setId("USER001");
        user1.setName("Charlie");

        User user2 = new User();
        user2.setId("USER002");
        user2.setName("David");

        List<User> allUsers = Arrays.asList(user1, user2);

        when(userRepository.findAll()).thenReturn(allUsers);

        mockMvc.perform(get("/api/mock/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").isEqualTo("USER001"))
                .andExpect(jsonPath("$[1].name").isEqualTo("David"));
    }

    // Add tests for other controller methods as you implement them

}