const express = require('express');
const redis = require('redis');
const { MongoClient } = require('mongodb');
const app = express();
const port = 9423;

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

let mongoClient;

MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    mongoClient = client;
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error(error));

app.get('/cache', async (req, res) => {
  const key = 'some-key';

  redisClient.get(key, async (err, data) => {
    if (err) throw err;

    if (data) {
      res.send({ message: 'Cache hit', data });
    } else {
      // Fetch data from MongoDB if not found in Redis cache
      const db = mongoClient.db('authdb');
      const collection = db.collection('authCollection');
      const result = await collection.findOne({ key });

      if (result) {
        const newData = result.data;
        redisClient.setex(key, 3600, newData); // Cache for 1 hour
        res.send({ message: 'Cache miss', data: newData });
      } else {
        res.status(404).send({ message: 'Data not found' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Authentication service running on port ${port}`);
});
