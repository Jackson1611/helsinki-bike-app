-- Add "total_journeys_starting" column to the "station" table
ALTER TABLE station
ADD COLUMN total_journeys_starting INT DEFAULT 0;

-- Add "total_journeys_ending" column to the "station" table
ALTER TABLE station
ADD COLUMN total_journeys_ending INT DEFAULT 0;

-- Update the "total_journeys_starting" column in the "station" table
UPDATE station
SET total_journeys_starting = (SELECT COUNT(*) FROM journey_temp WHERE departure_station_id = station.id);

-- Update the "total_journeys_ending" column in the "station" table
UPDATE station
SET total_journeys_ending = (SELECT COUNT(*) FROM journey_temp WHERE return_station_id = station.id);
