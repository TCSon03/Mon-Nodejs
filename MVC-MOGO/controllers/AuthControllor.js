const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    //lay du lieu nguoi dung nhap vao

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    //kiem tra email da ton tai
    var existedEmail = User.findOne(email);
    if (existedEmail) {
      return res.status(400).json({ message: "email da ton tai" });
    }
    //
    await User.crate({
      username: username,
      email: email,
      password: bcrypt.hash(password, 10),
    });
    res.status(201).json({ message: "dang ki thanh con", data: User });
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};
