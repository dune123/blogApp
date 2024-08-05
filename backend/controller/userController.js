const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};

const updateUser = async (req, res, next) => {

  if (req.user !== req.params.userId) {
    return res.status(403).json({ message: "You are not allowed to update this user" });
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return res.status(400).json({ message: "Username must be between 7 and 20 characters" });
    }
    if (req.body.username.includes(' ')) {
      return res.status(400).json({ message: "Username cannot contain space" });
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return res.status(400).json({ message: "Username must be lowercase" });
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return res.status(400).json({ message: "Username can only contain letters and numbers" });
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password
        }
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports = {
  updateUser
};
