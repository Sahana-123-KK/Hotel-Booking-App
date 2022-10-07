const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel Deleted Successfully" });
  } catch (error) {
    return res.status(500).json(error);
    console.log(error);
  }
};
const createHotel = async (req, res) => {
  try {
    const newHotel = await Hotel.create(req.body);
    res.json(newHotel);
  } catch (error) {
    return res.status(500).json(error);
    console.log(error);
  }
};
const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedHotel);
  } catch (error) {
    return res.status(500).json(error);
    console.log(error);
  }
};

const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.json(hotel);
  } catch (error) {
    return res.status(500).json(error);
    console.log(error);
  }
};

const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    return res.status(500).json(error);
    console.log(error);
  }
};

module.exports = { deleteHotel, createHotel, updateHotel, getHotel, getHotels };
