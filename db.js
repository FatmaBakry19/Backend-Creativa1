const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "note_db",
    password: "kokofe",
    port: 5432
});

module.exports = pool;