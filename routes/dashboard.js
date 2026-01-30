const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Bill = require("../models/Bill");

router.get("/stats", async (req, res) => {
  try {
    // Total products
    const totalProducts = await Product.countDocuments();

    // Today's date start
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Today sales
    const todayBills = await Bill.find({
      createdAt: { $gte: today }
    });

    const todaySales = todayBills.reduce(
      (sum, bill) => sum + bill.totalAmount,
      0
    );

    // Pending bills
    const pendingBills = await Bill.countDocuments({
      paymentStatus: "PENDING"
    });

    res.json({
      totalProducts,
      todaySales,
      pendingBills
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
