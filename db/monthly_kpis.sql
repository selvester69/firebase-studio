CREATE TABLE monthly_kpis (
    id VARCHAR(255) PRIMARY KEY,
    month VARCHAR(7), -- e.g., YYYY-MM
    metric VARCHAR(255),
    this_month_value DOUBLE PRECISION,
    this_month_display VARCHAR(255),
    past_month_value DOUBLE PRECISION,
    past_month_display VARCHAR(255),
    change_value DOUBLE PRECISION,
    change_display VARCHAR(255)
    -- past_30_days_data might be stored in a separate table or as JSONB if your database supports it
);