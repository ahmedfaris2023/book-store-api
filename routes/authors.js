const express = require("express");
const router = express.Router();
const { verfiyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  authors,
  authorsById,
  createAuthor,
  updateAuthor,
  authorDelete,
} = require("../controllers/authorController");
router.route("/").get(authors).post(verfiyTokenAndAdmin, createAuthor);

router
  .route("/:id")
  .get(authorsById)
  .put(verfiyTokenAndAdmin, updateAuthor)
  .delete(verfiyTokenAndAdmin, authorDelete);

module.exports = router;
