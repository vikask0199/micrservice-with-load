const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 8082;

// MongoDB connection
// mongoose.connect(process.env.MONGO_URL, {

// })
// .then(() => {
//   console.log('MongoDB connected');
// })
// .catch((err) => {
//   console.error('MongoDB connection error:', err);
//   process.exit(1); // Exit process if MongoDB connection fails
// });

// const orderSchema = new mongoose.Schema({
//   product: String,
//   quantity: Number
// });

// const Order = mongoose.model('Order', orderSchema);

// app.use(express.json());

// app.get('/orders', async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (err) {
//     console.error('Error fetching orders:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/orders', async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();
//     res.json(order);
//   } catch (err) {
//     console.error('Error saving order:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.get("/", async(req,res)=>{
  res.send(`Order Management Service running on port ${port}`);
})

app.listen(port, () => {
  console.log(`Order Management Service running on port ${port}`);
});
