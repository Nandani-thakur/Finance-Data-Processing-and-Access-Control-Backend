// userController.js
const User = require("../models/User");

// Get all users (admin only)
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Update role/status
exports.updateUser = async (req, res) => {
  const { role, status } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role, status },
    { new: true }
  ).select("-password");

  res.json(user);
};

// Delete user
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
};