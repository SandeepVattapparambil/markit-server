/**
 * @module geoCodeLib
 * This module houses the geo coding service, that uses google gecoding api
 * Third party api integrations can be added or changed here
 */
const GoogleMaps = require("@google/maps");
let googleMapsConfig = require("../config/googleMapsConfig.json");
const googleMapsClient = GoogleMaps.createClient({
  key: googleMapsConfig.api_key,
  Promise: Promise
});

const geoCodeLib = {};
geoCodeLib.getGeoCode = query => {
  return googleMapsClient
    .geocode({ address: query })
    .asPromise()
    .then(response => {
      return response.json.results;
    })
    .catch(err => {
      return err;
    });
};

module.exports = geoCodeLib;
