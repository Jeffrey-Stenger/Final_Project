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

function createWorkSession({ work_time }) {
    return db
        .query(
            `INSERT INTO work_sessions (work_time) VALUES ($1)
                 RETURNING *`,
            [work_time]
        )
        .then(({ rows }) => {
            console.log("New work session:", rows[0]);
            return rows[0];
        });
}

function getUserById(id) {
    return db
        .query("SELECT * FROM work_sessions WHERE id = $1", [id])
        .then(({ rows }) => {
            console.log("USER BEGOTTEN", rows[0]);
            return rows[0];
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
            console.log("Activity updated", rows[0]);
            return rows[0];
        });
}

// function stopTime()

// getUserById(1);
insertActivity({ activity: "calculating", user_id: 102 });
// createWorkSession({ work_time: 29 });

module.exports = { insertActivity };
