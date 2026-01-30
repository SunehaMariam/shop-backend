const Bill = require("../models/Bill");
const Product = require("../models/Product");

// CREATE BILL
exports.createBill = async (req, res) => {
  try {
    const {
      customer,
      items,
      totalAmount,
      paidAmount,
      changeReturn,
      paymentMethod,
    } = req.body;

    const lastBill = await Bill.findOne().sort({ billNo: -1 });
    const billNo = lastBill ? lastBill.billNo + 1 : 1001;

    for (let item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.qty },
      });
    }

    const bill = new Bill({
      billNo,
      customer,
      items,
      totalAmount,
      paidAmount,
      changeReturn,
      paymentMethod,
    });

    await bill.save();
    res.status(201).json(bill);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Bill creation failed" });
  }
};

// ✅ GET ALL BILLS (OUTSIDE createBill)
exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });

    res.json(bills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bills" });
  }
};
