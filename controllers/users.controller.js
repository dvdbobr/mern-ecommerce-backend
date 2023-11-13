const usersModel = require("../models/users.model");

const getUsers = async (req, res) => {
  try {
    const users = await usersModel.find({}).select("-password -tokens");
    const publicUsers = users.map((user) => {
      return user.getPublicProfile();
    });
    return res.send({ users: users });
  } catch (err) {
    return res.send(`error:${err}`);
  }
};

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await usersModel.findOne({ email });
    if (user) return res.status(400).json({ message: "email already exists" });
    const newUser = new usersModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    await newUser.save();
    const token = await newUser.generateAuthToken();
    return res.status(200).json({ "created successfully": { newUser }, token });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersModel.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.cookie("ut", token);
    res.send({ user: user.getPublicProfile(), token });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send({ message: "you have successfully logged out" });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
const getMyUser = async (req, res) => {
  try {
    const user = await usersModel.findById(req.user._id);
    if (!user) return res.status(400).json({ message: "User doesn't exist" });
    return res.send(req.user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// const addToCart = async (req, res) => {
//     try {
//         const user = await usersModel.findById(req.user.id)
//         if (!user)
//             return res.status(400).send('no such user')
//         await usersModel.findOneAndUpdate({ _id: req.user.id },
//             {
//                 cart: req.body.cart
//             }
//         )
//         return res.status(200).send({ message: "Item was added successfully" })
//     }
//     catch (err) {
//         return res.status(500).send({ message: err.message })
//     }
// }
module.exports = {
  register,
  getUsers,
  login,
  logout,
  getMyUser,
  // addToCart,
};
