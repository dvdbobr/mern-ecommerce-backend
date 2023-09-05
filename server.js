require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
// const path = require("path");
// const userRouter = require("./routes/users.route");
const productRouter = require("./routes/products.route");
// const categoryRouter = require("./routes/category.route");
// const orderRouter = require("./routes/order.route");
const port = 8000;

app.use(express.json());
app.use(cors());
app.get("/api/getUser", (req, res) => {
  const user = "David";
  res.json(user);
});
app.use("/api/products", productRouter);

const uri = process.env.MONGODB_URL;

try {
  mongoose.connect(
    "mongodb+srv://dvdbobr:dvdbobr123@ecommerce.sqggh.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
  // mongoose.connect(uri);
} catch (error) {
  console.log(error);
}

app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${port}`);
});
