import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
console.log( connectionString);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});



pool.query('SELECT NOW()')
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Database connection failed');
    console.log(err.message);
  });

export default {
  query: (text, params) => pool.query(text, params),
};