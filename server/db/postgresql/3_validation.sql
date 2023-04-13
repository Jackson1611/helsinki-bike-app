--validate journey 
CREATE TABLE journey AS
SELECT *
FROM journey_temp
WHERE covered_distance >= 10 AND duration >= 10;

ALTER TABLE journey ADD COLUMN id SERIAL PRIMARY KEY;


