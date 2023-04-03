--check for duplicate 
SELECT station_id, COUNT(*) 
FROM station_data 
GROUP BY station_id 
HAVING COUNT(*) > 1;
