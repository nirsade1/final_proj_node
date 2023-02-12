const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const app = express();
const cookiesParser = require("cookie-parser");
const cors = require("cors");
const dbURI = "mongodb://127.0.0.1:27017/node_finel_project";
const cardRoutes = require("./routes/cardRoutes");

mongoose.set("strictQuery", false);

mongoose
  .connect(dbURI)
  .then((resolt) => {
    console.log("connected to DB mongooo");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
//app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(cookiesParser());

//user routes
app.use("/api/user", userRoutes);
app.use("/api/aute", userRoutes);
app.use("/api/card", cardRoutes);
