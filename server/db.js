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

function startTime({ id }) {
    return db
        .query(`INSERT INTO work_sessions (id, recipient_id) VALUES ($1, $2)`, [
            id,
            recipient_id,
        ])
        .then(({ rows }) => {
            return rows[0];
        });
}

function stopTime()