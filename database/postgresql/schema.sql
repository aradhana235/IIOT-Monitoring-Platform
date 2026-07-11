CREATE TABLE organization (

    id UUID PRIMARY KEY,

    organization_name VARCHAR(150) NOT NULL,

    email VARCHAR(150),

    phone VARCHAR(20),

    address VARCHAR(255),

    status VARCHAR(20),

    created_at TIMESTAMP NOT NULL

);

CREATE TABLE device (
    id UUID PRIMARY KEY,
    device_name VARCHAR(100) NOT NULL,
    device_type VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL
);