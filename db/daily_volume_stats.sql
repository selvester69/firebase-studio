CREATE TABLE daily_volume_stats (
    date DATE PRIMARY KEY,
    orders_to_ship INT,
    overdue_shipments INT,
    open_pos INT,
    late_vendor_shipments INT
);