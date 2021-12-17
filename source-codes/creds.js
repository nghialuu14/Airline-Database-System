const { Pool } = require('pg');

const pool = new Pool({
    host: "3380db.cs.uh.edu",
    user: "dbs009",
    password: "dbs009",
    database: "COSC3380"
});

module.exports = pool;