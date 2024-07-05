const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 8828;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const orderSchema = new mongoose.Schema({
  product: String,
  quantity: Number
});

const Order = mongoose.model('Order', orderSchema);

app.use(express.json());

app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

app.listen(port, () => {
  console.log(`Order Management Service running on port ${port}`);
});
