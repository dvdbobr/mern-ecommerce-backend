const usersModel = require("../models/users.model");

const authAdmin = async (req, res, next) => {
  try {
    const user = await usersModel.findOne({ _id: req.user.id });
    if (user.role === 0)
      return res.status(400).json({ msg: "this user is not an admin" });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = authAdmin;
