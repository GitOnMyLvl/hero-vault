require('dotenv').config();
const { Pool } = require('pg');


module.exports = new Pool({
  connectionString: process.env.ONLINE_DB_CONNECTION_STRING,
});