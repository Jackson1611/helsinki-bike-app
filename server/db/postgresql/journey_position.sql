ALTER TABLE journey
ADD COLUMN departure_station_latitude NUMERIC(8, 6),
ADD COLUMN departure_station_longitude NUMERIC(9, 6),
ADD COLUMN return_station_latitude NUMERIC(8, 6),
ADD COLUMN return_station_longitude NUMERIC(9, 6);

UPDATE journey_temp
SET departure_station_longitude = (
    select longitude from station where journey_temp.departure_station_id = station.id )

UPDATE journey_temp
SET departure_station_latitude = (
    select latitude from station where journey_temp.departure_station_id = station.id )

UPDATE journey_temp
SET return_station_longitude = (
    select longitude from station where journey_temp.return_station_id = station.id )
    
UPDATE journey_temp
SET return_station_latitude = (
    select latitude from station where journey_temp.return_station_id = station.id )