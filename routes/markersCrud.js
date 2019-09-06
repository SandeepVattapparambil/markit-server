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
  GEOCODE.getGeoCode(req.body.payload)
    .then(data => {
      let dataArray = data.map(item => {
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
