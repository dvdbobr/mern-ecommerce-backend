const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
// const authAdmin = require("../middleware/authAdmin");
const categoryController = require("../controllers/categories.controller");

router.get("/", (req, res) => {
  categoryController.getCategories(req, res);
});
//   .post("/", auth, authAdmin, (req, res) => {
//     categoryController.createCategory(req, res);
//   });

module.exports = router;
