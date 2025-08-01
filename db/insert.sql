-- Sample data for the 'users' table
INSERT INTO users (id, name, email, join_date, total_orders, avatar_url) VALUES
('USER001', 'Alice Wonderland', 'alice@example.com', '2023-01-15', 3, 'https://placehold.co/100x100.png'),
('USER002', 'Bob The Builder', 'bob@example.com', '2022-11-20', 1, 'https://placehold.co/100x100.png'),
('USER003', 'Charlie Brown', 'charlie@example.com', '2023-03-10', 1, 'https://placehold.co/100x100.png');

-- Sample data for the 'orders' table
INSERT INTO orders (id, user_id, customer_name, status, order_date, eta, destination_address, delivery_agent_id, total_amount, current_location_lat, current_location_lng, current_location_address) VALUES
('ORD12345', 'USER001', 'Alice Wonderland', 'In Transit', '2024-07-15 10:30:00', '2024-07-22 10:30:00', '456 Wonderland Ave, Fantasyland, FL', 'AGENT001', 75.50, 34.0522, -118.2437, '123 Main St, Los Angeles, CA'),
('ORD67890', 'USER002', 'Bob The Builder', 'Processing', '2024-07-20 14:00:00', '2024-07-25 14:00:00', '789 Construction Rd, Builderville, TX', NULL, 120.00, 34.0522, -118.2437, 'Warehouse A, Long Beach, CA'),
('ORD24680', 'USER001', 'Alice Wonderland', 'Delivered', '2024-07-01 09:15:00', '2024-07-05 09:15:00', '999 Happiness St, San Francisco, CA', 'AGENT002', 25.99, 37.7749, -122.4194, '999 Happiness St, San Francisco, CA'),
('ORD11223', 'USER001', 'Alice Wonderland', 'Cancelled', '2024-06-25 11:00:00', '2024-07-02 11:00:00', 'Mad Tea Party Lane, Wonderland', NULL, 42.00, 51.5074, 0.1278, NULL),
('ORD33445', 'USER003', 'Charlie Brown', 'Pending Payment', '2024-07-21 08:00:00', '2024-07-26 08:00:00', 'Themyscira Outpost, Gateway City', NULL, 199.50, 38.9072, -77.0369, NULL);

-- Sample data for the 'inventory_items' table
INSERT INTO inventory_items (id, category, product, sku, in_stock) VALUES
('INV001', 'Electronics', 'Television', '789452', 107),
('INV002', 'Electronics', 'Washing Machine', '874843', 13),
('INV003', 'Electronics', 'Smartphone', '874102', 9),
('INV004', 'Electronics', 'Air Conditioner', '711239', 88),
('INV005', 'Appliances', 'Microwave Oven', '611236', 45);

-- Sample data for the 'daily_volume_stats' table (Conceptual)
INSERT INTO daily_volume_stats (date, orders_to_ship, overdue_shipments, open_pos, late_vendor_shipments) VALUES
('2024-07-22', 107, 21, 199, 13);

-- Sample data for the 'monthly_kpis' table (Conceptual)
INSERT INTO monthly_kpis (id, month, metric, this_month_value, this_month_display, past_month_value, past_month_display, change_value, change_display) VALUES
('kpi1', '2024-07', 'Inventory', 827000.00, '$827,000', 755000.00, '$755,000', 0.0953, '+10%');

-- Sample data for the 'financial_data' table (Conceptual)
INSERT INTO financial_data (region, cash_to_cash_time, account_rec_day, inventory_days, accounts_payable_days) VALUES
('Asia', -10.0, 18.0, 22.0, 42.0),
('Africa', 5.0, 20.0, 25.0, 38.0),
('Europe', 8.0, 15.0, 18.0, 25.0),
('USA', 12.0, 22.0, 17.0, 30.0);

-- Sample data for the 'order_items' table
INSERT INTO order_items (order_id, item) VALUES
('ORD12345', 'Mad Hatter Tea Set'),
('ORD12345', 'Cheshire Cat Plush'),
('ORD67890', 'Toolkit Deluxe'),
('ORD67890', 'Hard Hat'),
('ORD24680', 'Kite'),
('ORD24680', 'Football (for Lucy)');