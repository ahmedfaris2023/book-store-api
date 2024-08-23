const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { verfiyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  Author,
  validatedCreateAuthor,
  validatedUpdateAuthor,
} = require("../models/Author");

/**
 * @doc get all authors
 * @route /api/books
 * @method get
 * @access public
 */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const authorList = await Author.find();
    res.status(200).json(authorList);
  })
);

/**
 * @doc get book by id
 * @route /api/books/:id
 * @method get
 * @access public
 */

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);

    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  })
);

/**
 * @desc Create new author
 * @route /api/authors
 * @method POST
 * @access private (only admin)
 */
router.post(
  "/",
  verfiyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validatedCreateAuthor(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      img: req.body.img,
    });
    const resulte = await author.save();
    res.status(201).json(resulte);
  })
);

/**
 * @desc update author
 * @route /api/authors
 * @method put
 * @access private (only admin)
 */

router.put(
  "/:id",
  verfiyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validatedUpdateAuthor(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    }

    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          img: req.body.img,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(author);
  })
);

/**
 * @desc delete author
 * @route /api/authors
 * @method delete
 * @access private (only admin)
 */

router.delete(
  "/:id",
  verfiyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "author has been delete" });
    } else {
      res.status(400).json({ message: "author not found" });
    }
  })
);

module.exports = router;
