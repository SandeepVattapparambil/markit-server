/**
 * @module MarkIt
 * MarkIt app module
 */

/**
 * import dependencies
 */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");

/**
 * import geoCode service
 */
const geoCode = require("./services/geoCode");

/**
 * Create GEOCODE object as global so that the service
 * can be accessed from anywhere in the app
 */
global.GEOCODE = geoCode;

/**
 * Create a data store and set as global
 */
let dataStore = [];
global.dataStore = dataStore;

/**
 * import route for api
 */
const indexRouter = require("./routes/index");
const searchRouter = require("./routes/search");
const markersCrudRouter = require("./routes/markersCrud");

/**
 * instantiate MarkIt app
 */
const MarkIt = express();

/**
 * import and use middlewares
 */
MarkIt.use(require("./middlewares"));
MarkIt.use(bodyParser.urlencoded({ extended: false }));
MarkIt.use(bodyParser.json());
MarkIt.use(logger("dev"));
MarkIt.use(express.json());
MarkIt.use(express.urlencoded({ extended: false }));
MarkIt.use(cookieParser());
MarkIt.use(express.static(path.join(__dirname, "public")));

/**
 * add routes to the middleware chain
 */
MarkIt.use("/", indexRouter);
MarkIt.use("/search/:query", searchRouter);
MarkIt.use("/markers", markersCrudRouter);

/**
 * catch 404 and forward to error handler
 */
MarkIt.use(function(req, res, next) {
  next(createError(404));
});

/**
 * error handler
 */
MarkIt.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = MarkIt;
