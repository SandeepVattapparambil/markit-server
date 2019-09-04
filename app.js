var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");

let googleMapsConfig = require("./config/googleMapsConfig.json");
global.googleMapsConfig = googleMapsConfig;

let dataStore = [];
global.dataStore = dataStore;

var indexRouter = require("./routes/index");
var autoCompleteRouter = require("./routes/autoComplete");
const markersCrudRouter = require("./routes/markersCrud");

var app = express();

app.use(require("./middlewares"));
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/autocomplete/:query", autoCompleteRouter);
app.use("/markers", markersCrudRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
