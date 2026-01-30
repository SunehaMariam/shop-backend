const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  billNo: {
    type: Number,
    required: true,
    unique: true
  },

  customer: String,
  paymentMethod: String,

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      name: String,
      price: Number,
      qty: Number
    }
  ],

  totalAmount: Number,
  paidAmount: Number,
  changeReturn: Number,

  createdAt: {
    type: Date,
    default: Date.now
  },

  paymentStatus: {
    type: String,
    default: "PAID" // or "PENDING"
  }
});

module.exports = mongoose.model("Bill", billSchema);
