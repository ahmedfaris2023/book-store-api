const express = require("express");

const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");
require("dotenv").config();
const connectToDB = require("./config/db");

//Connection to Database
connectToDB();
//init app
const app = express();

//apply Middlewares is a design pattern
app.use(express.json());
app.use(logger);
//Route
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
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
