const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connect = require("./db/connection.js");
const cookieparser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieparser());

connect();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/hotels", require("./routes/hotels"));
app.use("/api/rooms", require("./routes/rooms"));
app.use("/api/users", require("./routes/user"));

app.listen(process.env.PORT, () => {
  console.log(`BookingApp Backend Running at PORT ${process.env.PORT} `);
});
