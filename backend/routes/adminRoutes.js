const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');

// Get all users
router.get('/users', async (req,res)=>{
  const users = await User.find().sort({createdAt:-1});
  res.json(users);
});

// Get all orders
router.get('/orders', async (req,res)=>{
  const orders = await Order.find().sort({createdAt:-1});
  res.json(orders);
});

// Get revenue
router.get('/revenue', async (req,res)=>{
  const orders = await Order.find({status:'SUCCESS'});
  const total = orders.reduce((sum,o)=>sum+o.amount,0);
  res.json({total});
});

module.exports = router;
