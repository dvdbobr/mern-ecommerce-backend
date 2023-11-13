const categoryModel = require("../models/categories.model");

const getCategories = async (req, res) => {
  try {
    // const users = await usersModel.find({}).select('-password -tokens')
    // const publicUsers = users.map(user =>{return user.getPublicProfile()})
    return res.send({ msg: "test category" });
  } catch (err) {
    return res.send(`error:${err}`);
  }
};
const createCategory = async (req, res) => {
  try {
    //only admin can CRUD categories
    //admin: role = 1
    const { name } = req.body;
    const category = await categoryModel.findOne({ name });
    if (category)
      return res.status(400).json({ msg: "this category already exists" });
    const newCategory = new categoryModel({ name });
    await newCategory.save();
    res.json({ msg: "category created successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
};
