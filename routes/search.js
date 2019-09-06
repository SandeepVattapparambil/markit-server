var express = require("express");
var searchRouter = express.Router({
  mergeParams: true
});

const generateUniqueId = string => {
  return parseInt(
    string
      .toString()
      .split(".")
      .join("")
  );
};

searchRouter.get("/", function(req, res, next) {
  let response = {};
  GEOCODE.getGeoCode(req.params.query)
    .then(data => {
      let dataArray = data.map(item => {
        return {
          id: generateUniqueId(item.geometry.location.lat),
          formatted_address: item.formatted_address,
          location_coordinates: item.geometry.location
        };
      });
      let markerData = Object.assign({}, ...dataArray);
      if (Object.keys(markerData).length) {
        const index = dataStore.findIndex(event => event.id === markerData.id);
        if (index === -1) {
          dataStore.push(markerData);
          response = {
            success: true,
            status: "OK",
            message: "Marker added"
          };
        } else {
          dataStore[index] = markerData;
          response = {
            success: true,
            status: "OK",
            message: "Marker exists"
          };
        }
      } else {
        response = {
          success: false,
          status: "OK",
          message: "Marker not found"
        };
      }
      res.status(200);
      res.json(response);
    })
    .catch(err => {
      response = {
        success: false,
        status: "OK"
      };
      res.status(200);
      res.json(response);
    });
});

module.exports = searchRouter;
