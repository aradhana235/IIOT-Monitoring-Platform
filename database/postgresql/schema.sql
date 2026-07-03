CREATE TABLE device (
    id UUID PRIMARY KEY,
    device_name VARCHAR(100) NOT NULL,
    device_type VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL
);