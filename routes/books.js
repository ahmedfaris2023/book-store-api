const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { verfiyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Book");

/**
 * @desc get all book
 * @route /api/books
 * @method get
 * @access public
 */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
    res.status(200).json(books);
  })
);

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method get
 * @access public
 */

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author");
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ massage: "book not found" });
    }
  })
);

/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access private (only admin)
 */

router.post(
  "/",
  verfiyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });
    const resulte = await book.save();
    res.status(201).json(resulte); //201 => created successfully
  })
);

/**
 * @desc update a book
 * @route /api/books/:id
 * @method put
 * @access private (only admin)
 */

router.put(
  "/:id",
  verfiyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(book);
  })
);

/**
 * @desc delete a book
 * @route /api/books/:id
 * @method delete
 * @access private (only admin)
 */

router.delete(
  "/:id",
  verfiyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "book has been deleted" });
    } else {
      res.status(400).json({ message: "book not found" });
    }
  })
);

// validate create book

module.exports = router;
