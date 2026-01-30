const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const billRoutes = require("./routes/billRoutes");
const dashboardRoutes = require("./routes/dashboard");
const app = express();

app.use(cors());              // 🔥 THIS LINE
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/dashboard", require("./routes/dashboard"));

app.use("/api/products", productRoutes);
app.use("/api/bills", billRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
}); 