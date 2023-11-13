const mongoose = require("mongoose");
// const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    cart: {
      type: Array,
      default: [],
    },
    role: {
      type: Number,
      default: 0,
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.TOKEN_SECRET
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await usermodel.findOne({ email });
  if (!user) {
    throw new Error("no such user");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("email or password mismatch");
  }
  return user;
};
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8);
  next();
});

const usermodel = mongoose.model("users", userSchema);
module.exports = usermodel;
