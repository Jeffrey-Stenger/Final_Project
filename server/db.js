const spicedPg = require("spiced-pg");

const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_NAME,
} = require("../secrets.json");

console.log(`[db] Connecting to: ${DATABASE_NAME}`);
const db = spicedPg(
    `postgres:${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}`
);
//*********** DB FUNCTIONS ***********/

function createWorkSession({ work_time, activity }) {
    return db
        .query(
            `INSERT INTO work_sessions (work_time, activity) VALUES ($1, $2)
                 RETURNING *`,
            [work_time, activity]
        )
        .then(({ rows }) => {
            return rows[0];
        });
}

function getUserStats({ start_date, end_date }) {
    return db
        .query(
            "SELECT * FROM work_sessions WHERE DATE(created_at) BETWEEN $1 AND $2",
            [start_date, end_date]
        )
        .then(({ rows }) => {
            console.log("user stats", rows);
            return rows;
        });
}

function insertActivity({ activity, user_id }) {
    return db
        .query(
            `UPDATE work_sessions
                SET activity = $1 WHERE id = $2
                RETURNING *`,
            [activity, user_id]
        )
        .then(({ rows }) => {
            return rows[0];
        });
}

// function stopTime()

// getUserById(1);
// insertActivity({ activity: "calculating", user_id: 102 });
// createWorkSession({ work_time: 29, activity: "calculating" });

// getUserStats({ start_date: "2022-03-05", end_date: "2022-04-20" });

module.exports = { insertActivity, createWorkSession, getUserStats };
