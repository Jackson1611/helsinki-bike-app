ALTER TABLE journey
ADD COLUMN departure_station_latitude NUMERIC(8, 6),
ADD COLUMN departure_station_longitude NUMERIC(9, 6),
ADD COLUMN return_station_latitude NUMERIC(8, 6),
ADD COLUMN return_station_longitude NUMERIC(9, 6);

UPDATE journey
SET departure_station_longitude = (
    select longitude from station where journey.departure_station_id = station.id )

UPDATE journey
SET departure_station_latitude = (
    select latitude from station where journey.departure_station_id = station.id )

UPDATE journey
SET return_station_longitude = (
    select longitude from station where journey.return_station_id = station.id )
    
UPDATE journey
SET return_station_latitude = (
    select latitude from station where journey.return_station_id = station.id )