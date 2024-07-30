const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  //khai bao cac truong va kieu du lieu o trong bang product
  name: { type: String },
  price: { type: Number },
  image: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
