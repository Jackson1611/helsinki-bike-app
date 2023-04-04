--validate journey 
CREATE TABLE journey AS
SELECT *
FROM journey_temp
WHERE covered_distance >= 10 AND duration >= 10;

ALTER TABLE journey ADD COLUMN id SERIAL PRIMARY KEY;


--delete duplicate
DELETE FROM journey
WHERE id IN (
    SELECT id
    FROM (
        SELECT id, ROW_NUMBER() OVER (partition BY departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration ORDER BY id) AS rnum
        FROM journey
    ) t
    WHERE t.rnum > 1
);
