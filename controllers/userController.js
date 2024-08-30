const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");

/**
 * @doc  Update  user
 * @route /api/auth/:id
 * @method PUT
 * @access private
 */

module.exports.updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      },
    },
    {
      new: true,
    }
  ).select("-password");
  res.status(200).json(updatedUser);
});
/**
 * @doc  get all users
 * @route /api/users
 * @method Get
 * @access private (only admin)
 */
module.exports.getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/**
 * @doc  get User By id
 * @route /api/users/:id
 * @method Get
 * @access private (only admin & user himselft)
 */

module.exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

/**
 * @doc  Delete User
 * @route /api/users/:id
 * @method DELETE
 * @access private (only admin & user himselft)
 */

module.exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "user has been deleted successfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});
