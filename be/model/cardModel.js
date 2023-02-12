const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");
//const express = require("express");

const cardSchema = new Schema({
  bizName: { type: String },
  about: { type: String },
  address: { type: String },
  phone: { type: String },
  pic: { type: String },
  bizNumber: { type: String, unique: true }, //random number
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
const Card = mongoose.model("card", cardSchema);

module.exports = Card;
//module.exports = generatebusinessCardNumber;

////////////////////////////
