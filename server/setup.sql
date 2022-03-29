DROP TABLE IF EXISTS work_sessions;

CREATE TABLE work_sessions (
    id                  SERIAL PRIMARY KEY,
    work_time           INTEGER,
    Activity            TEXT,   
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);