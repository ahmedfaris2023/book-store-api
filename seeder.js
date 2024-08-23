const { Book } = require("./models/Book");
const { books } = require("./data");
const connectToDo = require("./config/db");
require("dotenv").config();

// Connection TO DB
connectToDo();

// Import Books (seeding database)
const importBook = async () => {
  try {
    await Book.insertMany(books);
    console.log("books Imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Remove Book
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("books Removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-import") {
  importBook();
} else if (process.argv[2] === "-remove") {
  removeBooks();
}
