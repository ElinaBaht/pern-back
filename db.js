const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '14ulemep22!',
  host: 'localhost',
  port: 5432,
  database: 'pernlist',
});
module.exports = pool;
