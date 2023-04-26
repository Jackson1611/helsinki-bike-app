# Helsinki city bike app
This is a station management system app built with NodeJS, Express, PostgreSQL, and React. It allows users to view, add, and delete stations, as well as manage journey data.

## Video Demo

https://user-images.githubusercontent.com/103312138/231536057-3c50f20f-09fa-417b-a4c5-6e5ad3e4a9cc.mp4

## Preview 

### Journey list:
![Screenshot 2023-04-14 133530](https://user-images.githubusercontent.com/103312138/232022002-58e51739-3886-4345-99a1-9f413846f0b7.png)
### Top 5 Stations :
![Screenshot 2023-04-14 133552](https://user-images.githubusercontent.com/103312138/232022087-a8be2809-39fd-4f08-b21e-22b6131b21af.png)
### Journey on map:
![Screenshot 2023-04-14 133749](https://user-images.githubusercontent.com/103312138/232022262-b2f739ee-f6ab-4f49-a38d-77b745895616.png)
### Station list:
![Screenshot 2023-04-12 190509](https://user-images.githubusercontent.com/103312138/231715409-715e7ebd-931f-405c-8dd7-1683780bfe4f.png)
### Add new station dialog:
![Screenshot 2023-04-12 190527](https://user-images.githubusercontent.com/103312138/231715420-cca5b28f-aedd-4cac-b569-2ed76a9b7081.png)
### Station information and position on map:
![Screenshot 2023-04-12 190549](https://user-images.githubusercontent.com/103312138/231715431-d43f558c-3851-4c54-8af4-fdcf965af952.png)

## Prerequisites
Before building and running the app, make sure you have the following installed on your system:

- Node.js and npm (Node Package Manager)
- PostgreSQL database

## Installaltion
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
- https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv

Save the CSV file to this directory bike-app\server\data\
## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/bike-app.git 
```


2. Change to the server directory and install dependencies:

```bash
cd bike-app/server
npm install
```

3.Create a .env file in the server directory with the following contents:
```bash 
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bike_app
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```
Make sure to replace your_database_user and your_database_password with your actual database credentials.

4. Create the PostgreSQL database and import data:

You can create the database and import data using the SQL statements provided below. Make sure to update the file paths in the COPY statements to the correct location of your CSV files.

- Create database:
```bash 
CREATE DATABASE bike_app;
```
- Create station table:
```bash
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

```
- Create temporary journey table:
```bash
CREATE TABLE journey_temp(
    departure_time         TIMESTAMP,
    return_time            TIMESTAMP,
    departure_station_id   INT,
    departure_station_name TEXT,
    return_station_id      INT,
    return_station_name    TEXT,
    covered_distance       DOUBLE PRECISION,
    duration               INT
);

```
- Import the data: 
```bash
COPY station(fid, id, fi_name, se_name, en_name, fi_address, se_address, fi_city, se_city, operator_name, capacity, longitude, latitude)
FROM 'D:\bike-app\server\data\station.csv' 
DELIMITER ',' 
CSV HEADER;

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

```

- Make validated Journey table from temporary journey table 
```bash
CREATE TABLE journey AS
SELECT *
FROM journey_temp
WHERE covered_distance >= 10 AND duration >= 10;

DROP TABLE IF EXISTS journey_temp;

ALTER TABLE journey ADD COLUMN id SERIAL PRIMARY KEY;
```

5. Start the server:
```bash
npm start
```

6. change to the client directory and install dependencies:
```bash
cd ../client
npm install
```

7. Start the server:
```bash
cd server
npm run dev
```

8. Start the client:
```bash
cd client
npm run dev
```

9. Instruction for running backend test:
- Change to the server directory:
```bash 
cd bike-app/server
 ```
 
- Run the test using the following command: 
```bash
npm test
```

### Usage:

- The Bike App allows users to view journey statistics such as total distance, average duration, and busiest stations.
- Users can also view information about each city bicycle station, including the station name, address, operator, and capacity.
- The app provides a search functionality to search for specific stations or journeys.
- Users can also view the details of each journey, including departure and return times, covered distance, and duration.
- Users can also view top 5 most popular stations for both departure and return.
- Users can add new station and visually add the position on the map by dragging the marker to the position of the station.

## Technologies Used:

- Frontend: React, Material-UI, Datagrid, MapView, Dialog
- Backend: Express, Node.js, PostgreSQL, 
- Other tools/libraries: date-fns , Dotenv, leafletjs
