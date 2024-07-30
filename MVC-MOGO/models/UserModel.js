const mongoose = require("mongoose");

const Schema = mongodb.Schema;
const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
});

module.exports = mongoose.module("User", userSchema);
