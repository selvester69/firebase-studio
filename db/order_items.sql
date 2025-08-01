CREATE TABLE order_items (
    id SERIAL PRIMARY KEY, -- Using SERIAL for an auto-incrementing primary key
    order_id VARCHAR(255),
    item VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);