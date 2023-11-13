const jwt = require("jsonwebtoken");
const usersModel = require("../models/users.model");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await usersModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("no such user");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "please authenticate" });
  }
};
module.exports = auth;
