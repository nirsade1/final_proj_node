const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
  user: String,
  email: { type: String, unique: true },
  password: String,
  biz: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", userModel);
