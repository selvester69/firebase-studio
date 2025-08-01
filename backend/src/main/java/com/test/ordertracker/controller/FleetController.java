package com.test.ordertracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/fleet")
public class FleetController {

    @GetMapping
    public List<String> getAllAgents() {
        // TODO: Implement logic to fetch all fleet agents from a data source
        List<String> agents = new ArrayList<>();
        agents.add("Agent 1");
        agents.add("Agent 2");
        return agents;
    }

    @GetMapping("/{agentId}")
    public String getAgentById(@PathVariable String agentId) {
        // TODO: Implement logic to fetch agent details by ID from a data source
        return "Details for agent " + agentId;
    }
}
