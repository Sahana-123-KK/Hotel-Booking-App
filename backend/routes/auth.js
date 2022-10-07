const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { createUser } = require("../controllers/usersc");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, email, password: hashed });
    res.json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUser = await User.findOne({ username });
    if (!isUser) {
      return res.status(404).json({ message: "Not Found" });
    }
    const isCorrect = await bcrypt.compare(password, isUser.password);

    if (!isCorrect) {
      return res.status(402).json({ message: "Invalid Credentials" });
    }
    //use select to select or omit something particular to send to frontend for security
    const getuser = await User.findOne({ username }).select(
      "-password -isAdmin"
    );
    const token = jwt.sign(
      { user: isUser._id, isAdmin: isUser.isAdmin },
      process.env.JWT_KEY
    );
    res.cookie("jwtoken", token, { httpOnly: true }).json(getuser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  res.send("hello");
});

module.exports = router;
