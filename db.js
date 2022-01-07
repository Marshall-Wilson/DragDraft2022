const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'llamas',
    database: 'drag_draft_2022',
    host: 'localhost',
    port: 5432
});

module.exports = pool;