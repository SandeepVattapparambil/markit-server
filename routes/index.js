const express = require("express");
const router = express.Router();

const geoCode = require("../services/geocode");

/**
 * Index route
 */
router.get("/", function(req, res, next) {
  let response = {};
  geoCode
    .getGeoCode("berlin")
    .then(function(res) {
      reponse = {
        success: true,
        status: "OK",
        message: "markit-server is successfully",
        data: Object.assign({}, ...res).formatted_address
      };
    })
    .catch(function(err) {
      reponse = {
        success: false,
        status: "OK",
        message: "markit-server error"
      };
    });

  res.status(200);
  res.json(reponse);
});

module.exports = router;
