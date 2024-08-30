const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");
require("dotenv").config();
const connectToDB = require("./config/db");

//Connection to Database
connectToDB();
//init app
const app = express();
// Static Folder
app.use(express.static(path.join(__dirname, "images")));
//apply Middlewares is a design pattern
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// Helmet
app.use(helmet());

// cors policy
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
app.use(
  cors({
    origin: "*",
  })
);
//Set view engine
app.set("view engine", "ejs");

//Route
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/upload", require("./routes/upload"));
app.use("/password", require("./routes/password"));
//Error Handler middleware
app.use(notFound);
app.use(errorHandler);

// Running The server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(
    `Server is runing in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
