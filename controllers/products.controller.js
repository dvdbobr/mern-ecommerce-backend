const productsModel = require("../models/products.model");

const getProducts = async (req, res) => {
  try {
    const products = await productsModel.find({});
    return res.status(200).send(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getPaginatedProducts = async (req, res) => {
  // const page = Number(req.query.pageNumber)||1
  //const limit = parseInt(req.query.limit)
  // const startIndex = (page - 1) * limit
  // const endIndex = page * limit
  const pageLimit = 8;
  const page = parseInt(req.query.page) || 1; // 1 if not included

  try {
    // const results = {}
    // if (endIndex < products.length)
    //     results.next = {
    //         page: page + 1,
    //         limit: limit
    //     }
    // if (startIndex > 0) {
    //     results.previous = {
    //         page: page - 1,
    //         limit: limit
    //     }
    // }
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await productsModel.countDocuments({ ...keyword });
    const products = await productsModel
      .find({ ...keyword })
      .limit(pageLimit)
      .skip(pageLimit * (page - 1));

    //results.results = products.slice(startIndex, endIndex)
    return res.send({ products, page, pages: Math.ceil(count / pageLimit) });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getProductById = async (req, res) => {
  let id = req.params.id;
  try {
    let product = await productsModel.findOne({ productID: id });
    if (!product) {
      return res.status(400).send("no such product");
    }
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const createProduct = async (req, res) => {
  try {
    const {
      productID,
      title,
      category,
      description,
      price,
      url,
      countInStock,
    } = req.body;

    const product = await productsModel.findOne({ productID });
    if (product)
      return res.status(400).json({ message: "product already exists" });

    const newProduct = new productsModel({
      productID,
      title,
      category,
      description,
      price,
      url,
      countInStock,
    });
    await newProduct.save();
    res.json({ "new product created": newProduct });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const deleteProductById = async (req, res) => {
  const id = req.params.id;
  try {
    //can make this find by productID
    const product = await productsModel.findOneAndDelete({ productID: id });
    if (!product) return res.send("no such product");
    res.send("deleted product");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const {
      productID,
      title,
      category,
      description,
      price,
      url,
      countInStock,
    } = req.body;

    const updatedProduct = await productsModel.findOneAndUpdate(
      { productID: req.params.id },
      {
        productID,
        title,
        category,
        description,
        price,
        url,
        countInStock,
      }
    );
    res.json({ updated: updatedProduct });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updatedCountInStock = async (req, res) => {
  try {
    const productID = req.params.id;
    const { qty } = req.body;
    const product = await productsModel.findOne({ productID });
    const currentStock = product.countInStock - qty;
    if (currentStock < 0)
      return res.status(400).send("cant buy this many items");
    await productsModel.findOneAndUpdate(
      { productID },
      { countInStock: currentStock }
    );
    await product.save();
    res.send({ product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getPaginatedProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProduct,
  updatedCountInStock,
};
