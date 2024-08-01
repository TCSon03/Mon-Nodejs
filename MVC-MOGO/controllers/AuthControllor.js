const User = require("../models/UserModel");
const bcrypt = require("bcryptjs"); //mã hóa password
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    //kiểm tra email đã tồn tại trong hệ thống hay chưa
    var existedEmail = await User.findOne({ email: req.body.email });
    if (existedEmail) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    var hashedPassword = await bcrypt.hash(req.body.password, 10); //mã hóa password với bcrypt
    //lưu dữ liệu vào trong database
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Đăng ký thành công",
      data: newUser,
    });
  } catch {
    res.status(400).json({ message: "Error" });
  }
};

exports.login = async (req, res) => {
  try {
    //lay user/password
    const { email, password } = req.body;
    // console.log(email, password);

    //kiem tra co user tuong ung voi email da nhap hay khong

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "email khong ton tai" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Email/password khong dung" });
    }
    //su dung han sign(data, secretKey, {expiresIn: })de tao token
    //expiresIn: 60*6-*24 | expiresIn: '1h/1d'
    const token = jwt.sign({ id: user.id }, "wd18411", { expiresIn: "1h" });
    res.status(200).json({
      message: "Dang nhap thanh cong",
      token,
    });
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};
