const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 8081;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

console.log("pool status",pool)

app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    res.json(result.rows[0]);
  } catch (err) { 
    console.error('Error inserting user', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/", async (req, res) => {
  res.send(`User Management Service running on port ${port}`);
});

app.listen(port, () => {
  console.log(`User Management Service running on port ${port}`);
});
