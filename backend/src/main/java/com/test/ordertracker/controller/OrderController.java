package com.test.ordertracker.controller;

import com.test.ordertracker.model.Order;
import com.test.ordertracker.util.JsonDataLoader;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final JsonDataLoader jsonDataLoader = new JsonDataLoader();

    @GetMapping
    public List<Order> getAllOrders() throws IOException {
        return jsonDataLoader.loadList("orders.json", new TypeReference<List<Order>>() {});
    }

    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable String orderId) throws IOException {
        List<Order> orders = jsonDataLoader.loadList("orders.json", new TypeReference<List<Order>>() {});
        Optional<Order> foundOrder = orders.stream()
                .filter(order -> order.getId().equals(orderId))
                .findFirst();
        return foundOrder.orElse(null); // Or throw a custom exception if order not found
    }
}
