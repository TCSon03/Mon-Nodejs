const { body } = require("express-validator");
const Product = require("../models/ProductModel");

//lay danh sach
exports.getListClient = async (req, res) => {
  try {
    var products = await Product.find();
    //do du lieu ra giao dien
    // console.log(products);
    res.render("home", { pros: products });
  } catch (err) {
    console.error(err);
  }
};

//lay danh sach
exports.getList = async (req, res) => {
  try {
    var products = await Product.find();
    //do du lieu ra giao dien
    // console.log(products);
    res.render("admin", { pros: products });
  } catch (err) {
    console.error(err);
  }
};

//lấy thông tin chi tiết admin/edit
exports.getDetail = async (req, res) => {
  var id = req.params.id;
  var product = await Product.findById(id);

  res.render("edit", { product });
};
//lấy thông tin chi tiết
exports.getProductDetail = async (req, res) => {
  var id = req.params.id;
  var product = await Product.findById(id);

  res.render("productDetail", { product });
};
//điều hướng sang form tạo mới
exports.create = (req, res) => {
  res.render("create");
};
// //luu du lieu moi vao db

exports.save = async (req, res) => {
  var newProduct = {
    name: req.body.name,
    price: req.body.price,
    image: req.file.filename,
  };
  var product = await Product.create(newProduct);
  if (product) {
    console.log("create successfully");
    res.redirect("/admin");
  }
};

// //hàm cập nhật

exports.update = async (req, res) => {
  var id = req.params.id;
  // B1: lấy dữ liệu ng dùng nhập vào form
  var updatedProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  // Kiểm tra nếu có file ảnh mới thì cập nhật
  if (req.file) {
    updatedProduct.image = req.file.filename;
  }

  // B2: đẩy dữ liệu lên sv
  var product = await Product.findByIdAndUpdate(id, updatedProduct);
  if (product) {
    console.log("update successfully");
    res.redirect("/admin");
  }
};
//hàm xóa
exports.delete = async (req, res) => {
  var id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.redirect("/admin");
};
//xy ly api

//kiem tran du lieu
exports.apiGetList = async (req, res) => {
  try {
    var products = await Product.find();
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

//lấy thông tin chi tiết api
exports.apiGetDetail = async (req, res) => {
  try {
    //lay id san pham
    var id = req.params.id;
    //truy van lay du lieu
    var product = await Product.findById(id);
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(400).json({ error: err });
  }
};

//hàm xóa api
exports.apiDelete = async (req, res) => {
  try {
    var id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "xoa thanh cong" });
  } catch (error) {
    res.status(400).json({ error: err });
  }
};

// //luu du lieu moi vao db

exports.apiSave = async (req, res) => {
  try {
    //lay du lieu thong qua request
    var data = {
      name: req.body.name,
      price: req.body.price,
      image: req.file.filename,
    };
    var product = await Product.create(data);
    res.status(201).json({ data: product });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

//hàm cập nhật

exports.apiUpdate = async (req, res) => {
  try {
    //lay id san pham can sua
    var id = req.params.id;
    //thuc hien update
    await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({ message: "update thanh cong" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
