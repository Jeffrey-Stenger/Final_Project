DROP TABLE IF EXISTS work_sessions;

CREATE TABLE work_sessions (
    id                  SERIAL PRIMARY KEY,
    -- user_id             INTEGER NOT NULL,
    work_time           INTEGER,
    activity            VARCHAR(255),   
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO work_sessions (
	work_time,
	activity,
	created_at
) SELECT 
  round(random()*100 + 1), -- for integer
  (ARRAY['studying','coding','working','reading','exercising','team meeting', 'responding to emails'])[round(6*random())+1], -- for char/enum
  now() + round(random()*3600000) * '1 second'::interval -- for timestamps
FROM generate_series(1,300);