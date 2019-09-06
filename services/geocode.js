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
