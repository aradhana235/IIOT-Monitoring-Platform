CREATE KEYSPACE IF NOT EXISTS iiot_platform
WITH replication = {
    'class':'SimpleStrategy',
    'replication_factor':1
};

USE iiot_platform;

CREATE TABLE IF NOT EXISTS telemetry (
    device_id UUID,
    ts TIMESTAMP,
    temperature DOUBLE,
    humidity DOUBLE,
    PRIMARY KEY ((device_id), ts)
) WITH CLUSTERING ORDER BY (ts DESC);