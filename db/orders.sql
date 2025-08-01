CREATE TABLE orders (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    customer_name VARCHAR(255),
    status VARCHAR(255),
    order_date TIMESTAMP WITHOUT TIME ZONE,
    eta TIMESTAMP WITHOUT TIME ZONE,
    destination_address VARCHAR(255),
    delivery_agent_id VARCHAR(255),
    total_amount DOUBLE PRECISION,
    -- Embedded Location fields
    current_location_lat DOUBLE PRECISION,
    current_location_lng DOUBLE PRECISION,
    current_location_address VARCHAR(255)
);

-- For the 'items' list, you would typically have a separate table
-- CREATE TABLE order_items (
--     order_id VARCHAR(255),
--     item VARCHAR(255),
--     FOREIGN KEY (order_id) REFERENCES orders(id)
-- );