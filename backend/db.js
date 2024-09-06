const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "16265",
    host: "localhost",
    port: 5432,
    database: "foodapp"
});

module.exports = pool;