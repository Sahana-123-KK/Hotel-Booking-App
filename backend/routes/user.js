const express = require("express");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../middleware/verifyUser");
const router = express.Router();
const User = require("../models/userModel");

// router.get("/checktoken", verifyToken, async (req, res) => {
//   res.send("You are Logged in..");
// });
// router.get("/checkuser/:id", verifyUser, async (req, res) => {
//   res.send("You are Logged in and you can delete and update your account.");
// });
// router.get("/checkadmin/:id", verifyAdmin, async (req, res) => {
//   res.send("You are Logged in and you can delete and update all accounts.");
// });
router.put("/updateuser/:id", verifyUser, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/getuser/:id", verifyUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/getusers", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.delete("/deleteuser/:id", verifyUser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
