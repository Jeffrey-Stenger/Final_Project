DROP TABLE IF EXISTS work_sessions;

CREATE TABLE work_sessions (
    id                  SERIAL PRIMARY KEY,
    start_time          TIMESTAMP,
    end_time            TIMESTAMP,
    Activity            TEXT,   
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);