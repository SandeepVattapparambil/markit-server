const express = require("express");
const markersCrudRouter = express.Router({
  mergeParams: true
});

let GoogleMaps = require("@google/maps");
const googleMapsClient = GoogleMaps.createClient({
  key: googleMapsConfig.api_key,
  Promise: Promise
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
  googleMapsClient
    .geocode({ address: req.body.payload })
    .asPromise()
    .then(data => {
      let dataArray = data.json.results.map(item => {
        return {
          id: parseInt(req.params.id),
          formatted_address: item.formatted_address,
          location_coordinates: item.geometry.location
        };
      });
      let markerData = Object.assign({}, ...dataArray);
      if (Object.keys(markerData).length) {
        const index = dataStore.findIndex(
          event => event.id === parseInt(req.params.id)
        );
        if (index === -1) {
          response = {
            success: false,
            status: "OK",
            message: "Marker not found"
          };
        } else {
          dataStore[index] = markerData;
          response = {
            success: true,
            status: "OK",
            message: "Marker updated"
          };
        }
      } else {
        response = {
          success: false,
          status: "OK",
          message: "No markers found"
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

/**
 * Delete
 */
markersCrudRouter.delete("/:id", function(req, res, next) {
  let id = req.params.id;
  let response = {};
  if (dataStore && dataStore.length) {
    const index = dataStore.findIndex(event => event.id == id);
    if (index === -1) {
      response = {
        success: false,
        status: "OK",
        message: "Marker not found"
      };
    } else {
      dataStore.splice(index, 1);
      response = {
        success: true,
        status: "OK",
        message: `Marker with id ${id} deleted`
      };
    }
  } else {
    response = {
      success: false,
      status: "OK",
      message: "No Markers found"
    };
  }
  res.status(200);
  res.json(response);
});

module.exports = markersCrudRouter;
