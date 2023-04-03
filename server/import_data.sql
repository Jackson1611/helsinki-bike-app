--Import data for station table 
COPY station(fid, id, fi_name, se_name, en_name, fi_address, se_address, fi_city, se_city, operator_name, capacity, longitude, latitude)
FROM 'D:\bike-app\server\data\station.csv' 
DELIMITER ',' 
CSV HEADER;

--
COPY journey_temp(departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration)
FROM 'D:\bike-app\server\data\2021-05.csv'
DELIMITER ','
CSV HEADER;

COPY journey_temp(departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration)
FROM 'D:\bike-app\server\data\2021-06.csv'
DELIMITER ','
CSV HEADER;

COPY journey_temp(departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration)
FROM 'D:\bike-app\server\data\2021-07.csv'
DELIMITER ','
CSV HEADER;
