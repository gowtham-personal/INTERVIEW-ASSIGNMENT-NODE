const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const PORT = process.env.PORT || 3010;
const logger = require("morgan");
let app = express();
var indexRouter = require("./src/routes/indexRoutes");
var authRouter = require("./src/routes/authRoutes");
var geoCodingRouter = require("./src/routes/geoCodingRoutes");
const cors = require("cors");

app.use(cors());

// Simple logger
app.use(
  logger("combined", {
    stream: fs.createWriteStream("./express.log", { flags: "a" })
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/api/geocode", geoCodingRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

app.listen(PORT, () =>
  console.log(`Express currently running on port ${PORT}`)
);

module.exports = app;
