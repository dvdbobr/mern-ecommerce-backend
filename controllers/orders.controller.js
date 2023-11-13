const ordersModel = require("../models/orders.model");

const makeOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
    } = req.body;
    // if (!images) return res.status(400).json({ message: 'no images given' })
    if (orderItems && orderItems.length === 0) {
      return res.status(400).send({ message: "No items in order" });
    } else {
      const order = new ordersModel({
        userID: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
      });
      await order.save();
      return res.send(order);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getOrderById = async (req, res) => {
  try {
    const order = await await ordersModel.findById(req.params.id);

    if (!order) return res.status(400).json({ message: "order not found" });
    res.send(order);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserOrders = async (req, res) => {
  const orders = await ordersModel.find({ userID: req.user._id });
  if (!orders) return res.status(400).json({ message: "orders not found" });
  res.json(orders);
};
module.exports = {
  makeOrder,
  getOrderById,
  getUserOrders,
};
