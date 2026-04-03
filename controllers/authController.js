// authController.js
const { validateEmail, validatePassword } = require("../utils/validators");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔥 debug

    const { name, email, password, role } = req.body;

    // validation 
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    if (!validateEmail(email)) {
  return res.status(400).json({ msg: "Invalid email" });
}

if (!validatePassword(password)) {
  return res.status(400).json({ msg: "Password must be at least 6 characters" });
}

    //  check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    
    const hashed = await bcrypt.hash(password, 10);

    
    const user = await User.create({
  name,
  email,
  password: hashed,
  role: role || "viewer",
});

const { password: _, ...safeUser } = user.toObject();

res.status(201).json({
  msg: "User registered",
  user: safeUser
});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } 
    );

  
    res.json({
  msg: "Login successful",
  token,
  user: {
    id: user._id,
    role: user.role,
    email: user.email
  }
});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};