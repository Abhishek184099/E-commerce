const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Products");
const User = require("../models/User");

const createOrder = async (req, res) => {
    try {
      const userId = req.user._id;
  
      // Fetch cart items for the user
      const cartItems = await Cart.find({ addBy: userId });
  
      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'No items in the cart to create an order' });
      }
  
      const orderProducts = cartItems.map(item => ({
        _id: item._id,  
        price: item.price,
        title: item.title,
      }));
  
      const newOrder = new Order({
        products: orderProducts,
        createdBy: userId,
      });
  
      await newOrder.save();
  
      await Cart.deleteMany({ addBy: userId });
  
      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (err) {
      console.error('Error in createOrder controller:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getOrders = async (req, res) => {
    try {
      const userId = req.user._id;  
  
      const orders = await Order.find({ createdBy: userId });
  
      if (!orders.length) {
        return res.status(404).json({ error: 'No orders found' });
      }
  
      res.status(200).json(orders);
    } catch (err) {
      console.error('Error fetching orders:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  module.exports = { createOrder,getOrders };
  
