const express = require("express");
const markersCrudRouter = express.Router({
  mergeParams: true
});

markersCrudRouter.get("/", function(req, res, next) {
  let reponse = {
    success: true,
    status: "OK",
    message: "markit-server is successfully"
  };
  res.status(200);
  res.json(reponse);
});

module.exports = markersCrudRouter;
