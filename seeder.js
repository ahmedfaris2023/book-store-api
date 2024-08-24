const { Book } = require("./models/Book");
const { Author } = require("./models/Author");
const { books, authors } = require("./data");
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

// Import Authors (seeding database)
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("Author Imported");
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
} else if (process.argv[2] === "-import-authors") {
  importAuthors();
}
