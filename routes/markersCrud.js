const express = require("express");
const markersCrudRouter = express.Router({
  mergeParams: true
});

/**
 * Read all
 */
markersCrudRouter.get("/", function(req, res, next) {
  let reponse = {
    success: true,
    status: "OK",
    markers: [...dataStore],
    markers_count: [...dataStore].length
  };
  res.status(200);
  res.json(reponse);
});

/**
 * Edit
 */
markersCrudRouter.put("/:id", function(req, res, next) {
  let reponse = {
    success: true,
    status: "OK",
    id: req.params.id
  };
  res.status(200);
  res.json(reponse);
});

/**
 * Delete
 */
markersCrudRouter.delete("/:id", function(req, res, next) {
  let reponse = {
    success: true,
    status: "OK",
    id: req.params.id
  };
  res.status(200);
  res.json(reponse);
});

module.exports = markersCrudRouter;
