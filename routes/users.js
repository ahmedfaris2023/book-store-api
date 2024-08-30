const express = require("express");
const router = express.Router();
const {
  updateUser,
  getAllUser,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

const {
  verifytoken,
  verfiyTokenAndHuthorizat,
  verfiyTokenAndAdmin,
} = require("../middlewares/verifyToken");

router
  .route("/")
  .get(verfiyTokenAndAdmin, getAllUser)
  .put(verfiyTokenAndHuthorizat, updateUser);

router
  .route("/:id")
  .get(verfiyTokenAndHuthorizat, getUserById)
  .delete(verfiyTokenAndHuthorizat, deleteUser);

module.exports = router;
