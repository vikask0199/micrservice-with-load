const express = require('express');
const redis = require('redis');
require('dotenv').config();

const app = express();
const port = 3002;

const client = redis.createClient({
  url: process.env.REDIS_URL
});

app.use(express.json());

app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  // Authentication logic here
  res.json({ message: 'Authenticated' });
});

app.listen(port, () => {
  console.log(`Authentication Service running on port ${port}`);
});
