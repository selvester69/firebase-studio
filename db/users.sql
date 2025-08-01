CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    join_date DATE,
    total_orders INT,
    avatar_url VARCHAR(255)
);