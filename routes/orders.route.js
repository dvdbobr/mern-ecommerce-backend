const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//const paginatedResult = require('../middleware/paginatedResult')
const orderController = require("../controllers/orders.controller");

router
  .post("/", auth, (req, res) => {
    orderController.makeOrder(req, res);
  })
  .get("/getOrderById/:id", auth, (req, res) => {
    orderController.getOrderById(req, res);
  })
  .get("/myorders", auth, (req, res) => {
    orderController.getUserOrders(req, res);
  });

module.exports = router;
