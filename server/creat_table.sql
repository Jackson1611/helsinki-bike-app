--create database
CREATE DATABASE bike_app

CREATE TABLE journey_temp (
    departure_time         TIMESTAMP,
    return_time            TIMESTAMP,
    departure_station_id   INT,
    departure_station_name TEXT,
    return_station_id      INT,
    return_station_name    TEXT,
    covered_distance       DOUBLE PRECISION,
    duration               INT
);

CREATE TABLE station (
    fid SERIAL,
    id INT PRIMARY KEY,
    fi_name TEXT,
    se_name TEXT,
    en_name TEXT,
    fi_address TEXT,
    se_address TEXT,
    fi_city TEXT,
    se_city TEXT,
    operator_name TEXT,
    capacity INT,
    longitude NUMERIC(9,6),
    latitude NUMERIC(8,6)
);

CREATE UNIQUE INDEX station_fid_uindex
    ON station (fid);

CREATE UNIQUE INDEX station_id_uindex
    ON station (id);
