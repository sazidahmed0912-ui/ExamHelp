const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  state: String,

  originalAmount: Number,   // Actual price before discount
  discount: Number,         // Total discount applied
  amount: Number,           // Final payable amount

  coupon: String,
  referCode: String,

  status: String,
  createdAt: Date
});

module.exports = mongoose.model("Order", OrderSchema);
