-- Journey Data table
ALTER TABLE journey ADD COLUMN search tsvector
    GENERATED ALWAYS AS (to_tsvector('simple', departure_station_name || ' ' || return_station_name)) STORED;

-- Station Data table
ALTER TABLE station ADD COLUMN search tsvector
    GENERATED ALWAYS AS (to_tsvector('simple', fi_name || ' ' || se_name)) STORED;

CREATE INDEX search_journey ON journey_temp USING GIN (search);
CREATE INDEX tssearch_station ON station USING GIN (search);