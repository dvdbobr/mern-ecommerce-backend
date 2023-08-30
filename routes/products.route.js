const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");
// const authAdmin = require("../middleware/authAdmin");
//const paginatedResult = require('../middleware/paginatedResult')
const productController = require("../controllers/products.controller");

router
  .get("/", (req, res) => {
    productController.getProducts(req, res);
  })
  .get("/paginated", (req, res) => {
    productController.getPaginatedProducts(req, res);
  })
  .get("/:id", (req, res) => {
    productController.getProductById(req, res);
  })
  //   .post("/", auth, authAdmin, (req, res) => {
  //     productController.createProduct(req, res);
  //   })
  //   .delete("/:id", auth, authAdmin, (req, res) => {
  //     productController.deleteProductById(req, res);
  //   })
  //   .put("/:id", auth, authAdmin, (req, res) => {
  //     productController.updateProduct(req, res);
  //   })
  .put("/updateProductStock/:id", (req, res) => {
    productController.updatedCountInStock(req, res);
  });

module.exports = router;
