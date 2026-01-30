const Bill = require("../models/Bill");

exports.dailyReport = async (req, res) => {
  try {
    // TODAY DATE RANGE
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const bills = await Bill.find({
      createdAt: { $gte: start, $lte: end },
    }).populate("items.productId", "name");

    let totalBills = bills.length;
    let totalSales = 0;
    let totalProductsSold = 0;

    const productMap = {};

    bills.forEach(bill => {
      totalSales += bill.totalAmount;

      bill.items.forEach(item => {
        totalProductsSold += item.qty;

        const name = item.productId?.name || "Unknown";

        if (!productMap[name]) {
          productMap[name] = 0;
        }
        productMap[name] += item.qty;
      });
    });

    const bestSelling = Object.keys(productMap).map(name => ({
      name,
      sold: productMap[name],
    }));

    res.json({
      totalBills,
      totalSales,
      totalProductsSold,
      bestSelling,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Daily report failed" });
  }
};
