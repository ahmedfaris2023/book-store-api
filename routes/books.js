const express = require("express");
const { verfiyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// /api/books
router.route("/").get(getAllBooks).post(verfiyTokenAndAdmin, createBook);

// /api/books/:id
router
  .route("/:id")
  .get(getBookById)
  .put(verfiyTokenAndAdmin, updateBook)
  .delete(verfiyTokenAndAdmin, deleteBook);

// validate create book

module.exports = router;
