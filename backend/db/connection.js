const mongoose = require("mongoose");

const connect = async () => {
  mongoose.connect(process.env.MONGOSTRING, () => {
    console.log("Connected To Mongo...");
  });
};

module.exports = connect;
