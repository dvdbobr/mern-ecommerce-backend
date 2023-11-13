const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/users.controller");

router
  .get("/", (req, res) => {
    userController.getUsers(req, res);
  })
  .get("/getMyUser", auth, (req, res) => {
    userController.getMyUser(req, res);
  })
  .post("/register", (req, res) => {
    userController.register(req, res);
  })
  .post("/login", (req, res) => {
    userController.login(req, res);
  })
  .post("/logout", auth, (req, res) => {
    userController.logout(req, res);
  });
// .put('/addToCart', auth, (req, res) => {
//     userController.addToCart(req, res);
// })

module.exports = router;
