const express = require("express");
const { verifyAdmin } = require("../middleware/verifyUser");
const router = express.Router();
const Hotel = require("../models/hotelModel");
const Room = require("../models/roomModel");

router.post("/createhotel", verifyAdmin, async (req, res) => {
  try {
    const newHotel = await Hotel.create(req.body);
    console.log(req.body);
    res.json(newHotel);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.put("/updatehotel/:id", verifyAdmin, async (req, res) => {
  try {
    console.log(req.body);

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedHotel);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/gethotel/:id", async (req, res) => {
  try {
    console.log(req.body);

    const hotel = await Hotel.findById(req.params.id);
    res.json(hotel);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/gethotels", async (req, res) => {
  const { min, max, ...other } = req.query;
  try {
    console.log(req.body);

    const hotels = await Hotel.find({
      ...other,
      cheapestPrize: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit);
    console.log(req.query);
    res.json(hotels);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.delete("/deletehotel/:id", verifyAdmin, async (req, res) => {
  try {
    console.log(req.body);

    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel Deleted Successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json(error);
  }
});

router.get("/countbycity", async (req, res) => {
  try {
    const cities = req.query.cities.split(",");

    //new syntax promise.all for completion of all array elements
    const numberlist = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.json(numberlist);
    console.log(numberlist);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/countbytype", async (req, res) => {
  try {
    // const cities = req.query.cities.split(",");

    // //new syntax promise.all for completion of all array elements
    // const numberlist = await Promise.all(
    //   cities.map((city) => {
    //     return Hotel.countDocuments({ city: city });
    //   })
    // );

    const hotelsNo = await Hotel.countDocuments({ type: "Hotel" });
    const resortsNo = await Hotel.countDocuments({ type: "Resort" });
    const apartmentsNo = await Hotel.countDocuments({ type: "Apartment" });
    const villasNo = await Hotel.countDocuments({ type: "Villa" });
    const cabinsNo = await Hotel.countDocuments({ type: "Cabin" });
    res.json([
      { type: "Hotel", no: hotelsNo },

      { type: "Resort", no: resortsNo },
      { type: "Apartment", no: apartmentsNo },
      { type: "Villa", no: villasNo },
      { type: "Cabin", no: cabinsNo },
    ]);
    // console.log(res.json());
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/:id/getrooms", async (req, res) => {
  let success = false;
  try {
    const { id } = req.params;
    const hotelis = await Hotel.findById(id);
    const list = await Promise.all(
      hotelis.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    success = true;
    res.json({ success, list });
  } catch (error) {
    return res.status(500).json({ success, error });
  }
});

module.exports = router;
