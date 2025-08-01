package com.example.ordertracker.repository;

import com.example.ordertracker.model.Order;
import com.example.ordertracker.model.Order.Location;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private TestEntityManager entityManager;

    private Order order1;
    private Order order2;
    private Order order3; // Add another order for user ID test

    @BeforeEach
    void setUp() {
        // Clear the database before each test
        orderRepository.deleteAll();

        // Create and persist sample orders
        order1 = new Order();
        order1.setId("ORD001");
        order1.setUserId("USER001"); // Set user ID
        order1.setCustomerName("Alice");
        order1.setStatus("Shipped");
        order1.setOrderDate(Instant.now());
        order1.setEta(Instant.now().plusSeconds(3600));
        order1.setItems(List.of("Item A", "Item B"));
        Location loc1 = new Location();
        loc1.setLat(10.0);
        loc1.setLng(20.0);
        loc1.setAddress("Address 1");
        order1.setCurrentLocation(loc1);
        order1.setDestinationAddress("Destination 1");

        order2 = new Order();
        order2.setId("ORD002");
        order2.setUserId("USER002"); // Set user ID
        order2.setCustomerName("Bob");
        order2.setStatus("Backordered");
        order2.setOrderDate(Instant.now().minusSeconds(86400));
        order2.setEta(Instant.now().plusSeconds(86400 * 2));
        order2.setItems(List.of("Item C"));
        Location loc2 = new Location();
        loc2.setLat(30.0);
        loc2.setLng(40.0);
        loc2.setAddress("Address 2");
        order2.setCurrentLocation(loc2);
        order2.setDestinationAddress("Destination 2");

        order3 = new Order();
        order3.setId("ORD003");
        order3.setUserId("USER001"); // Same user as order1
        order3.setCustomerName("Alice");
        order3.setStatus("Shipped");
        order3.setOrderDate(Instant.now().minusSeconds(172800));
        order3.setEta(Instant.now().plusSeconds(3600 * 3));
        order3.setItems(List.of("Item D"));
        Location loc3 = new Location();
        loc3.setLat(50.0);
        loc3.setLng(60.0);
        loc3.setAddress("Address 3");
        order3.setCurrentLocation(loc3);
        order3.setDestinationAddress("Destination 3");

        entityManager.persist(order1);
        entityManager.persist(order2);
        entityManager.persist(order3); // Persist the new order
        entityManager.flush();
    }

    @Test
    void testFindAll() {
        List<Order> orders = orderRepository.findAll();
        assertThat(orders).hasSize(3); // Update size expectation
        assertThat(orders).containsExactlyInAnyOrder(order1, order2, order3); // Update contains expectation
    }

    @Test
    void testFindById() {
        Optional<Order> foundOrder = orderRepository.findById("ORD001");
        assertThat(foundOrder).isPresent();
        assertThat(foundOrder.get().getCustomerName()).isEqualTo("Alice");
    }

    @Test
    void testFindByStatus() {
        List<Order> backorderedOrders = orderRepository.findByStatus("Backordered");
        assertThat(backorderedOrders).hasSize(1);
        assertThat(backorderedOrders).containsExactly(order2);
    }

    @Test
    void testDeleteOrder() {
        orderRepository.deleteById("ORD001");
        Optional<Order> deletedOrder = orderRepository.findById("ORD001");
        assertThat(deletedOrder).isNotPresent();
    }

    @Test
    void testFindByUserId() {
        List<Order> user1Orders = orderRepository.findByUserId("USER001");
        assertThat(user1Orders).hasSize(2);
        assertThat(user1Orders).containsExactlyInAnyOrder(order1, order3);

        List<Order> user2Orders = orderRepository.findByUserId("USER002");
        assertThat(user2Orders).hasSize(1);
        assertThat(user2Orders).containsExactly(order2);

        List<Order> user3Orders = orderRepository.findByUserId("USER003");
        assertThat(user3Orders).isEmpty();
    }

    @Test
    void testFindAllWhenNoOrdersExist() {
        orderRepository.deleteAll();
        List<Order> orders = orderRepository.findAll();
        assertThat(orders).isEmpty();
    }
}