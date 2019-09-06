var express = require("express");
var autoCompleteRouter = express.Router({
  mergeParams: true
});

let GoogleMaps = require("@google/maps");
const googleMapsClient = GoogleMaps.createClient({
  key: googleMapsConfig.api_key,
  Promise: Promise
});

const generateUniqueId = lat => {
  return parseInt(
    lat
      .toString()
      .split(".")
      .join("")
  );
};

autoCompleteRouter.get("/", function(req, res, next) {
  let response = {};
  googleMapsClient
    .geocode({ address: req.params.query })
    .asPromise()
    .then(data => {
      let dataArray = data.json.results.map(item => {
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
            message: "Location added"
          };
        } else {
          dataStore[index] = markerData;
          response = {
            success: true,
            status: "OK",
            message: "Location exists"
          };
        }
      } else {
        response = {
          success: false,
          status: "OK",
          message: "Location not found"
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

module.exports = autoCompleteRouter;
