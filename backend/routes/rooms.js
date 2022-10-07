const express = require("express");
const router = express.Router();
const Room = require("../models/roomModel");
const Hotel = require("../models/hotelModel");
const { verifyAdmin, verifyUser } = require("../middleware/verifyUser");

router.post("/createroom/:hotelid", verifyAdmin, async (req, res) => {
  let success = false;
  try {
    const { hotelid } = req.params;
    const newroom = await Room.create(req.body);
    await Hotel.findByIdAndUpdate(hotelid, {
      $push: { rooms: newroom._id },
    });
    success = true;
    res.json({ success, newroom });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updateroom/:id", verifyAdmin, async (req, res) => {
  try {
    console.log(req.body);

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedRoom);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/getroom/:id", async (req, res) => {
  try {
    console.log(req.body);

    const room = await Room.findById(req.params.id);
    res.json(room);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/getrooms", async (req, res) => {
  try {
    console.log(req.body);

    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.delete("/deleteroom/:id/:hotelid", verifyAdmin, async (req, res) => {
  try {
    console.log(req.body);

    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(req.params.hotelid, {
      $pull: { rooms: req.params.id },
    });
    res.json({ message: "Room Deleted Successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.put("/availability/:id", async (req, res) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );
    res.json("Room status is updated");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
