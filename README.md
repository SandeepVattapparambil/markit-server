# markit-server

MarkIt server exposes the gecoding CRUD API endpoints

### How to run ?

From the terminal, navigate to the project folder, and then install dependencies by:

```sh
npm i
```

and then run the server using:

```sh
npm start
```

Then terminal logs the following line:

```sh
markit-server running successfully on port: 3001
markit-server api can be accessed from: http://localhost:3001
```

#### Available End points

##### 1. Index

This endpoint gives the status of the markit api server

`GET /`

**response**

```json
{
  "success": true,
  "status": "OK",
  "message": "markit-server is running successfully"
}
```

##### 2. List all Markers (Read)

This endpoint gives the list of all markers created and stored in the server

`GET /markers`

**response**

```json
{
  "success": true,
  "status": "OK",
  "markers": [
    {
      "id": 513396955,
      "formatted_address": "Leipzig, Germany",
      "location_coordinates": {
        "lat": 51.3396955,
        "lng": 12.3730747
      }
    },
    {
      "id": 5252000659999999,
      "formatted_address": "Berlin, Germany",
      "location_coordinates": {
        "lat": 52.52000659999999,
        "lng": 13.404954
      }
    }
  ],
  "markers_count": 2
}
```

##### 3. Add a Marker (Create)

This endpoint creates a marker in the server by taking in the address as input query

`GET /search/:search_query`

**response**

```json
{
  "success": true,
  "status": "OK",
  "message": "Marker added"
}
```

if the marker is already added in the server, the response would like this:

```json
{
  "success": true,
  "status": "OK",
  "message": "Marker exists"
}
```

if the address provided is invalid or non-existent, then the response would look like this:

```json
{
  "success": false,
  "status": "OK",
  "message": "Marker not found"
}
```

##### 4. Edit a Marker (Update)

This endpoint updates a marker in the server by taking in the new address as input query together with the id of the marker

`PUT /markers/:id`

payload body in json

```json
{
  "payload": "berlin"
}
```

**response**

```json
{
  "success": true,
  "status": "OK",
  "message": "Marker updated"
}
```

if a non existent marker id is passed, then the response would look like:

```json
{
  "success": false,
  "status": "OK",
  "message": "Marker not found"
}
```

##### 4. Delete a Marker (Delete)

This endpoint deletes a marker when an id is passed with the request

`DELETE /markers/:id`

**response**

```json
{
  "success": true,
  "status": "OK",
  "message": "Marker with id 5252000659999999 deleted"
}
```

if a non existent marker id is passed, then the response would look like this:

```json
{
  "success": false,
  "status": "OK",
  "message": "Marker not found"
}
```

### Guideline Questions

#### 1. How do you handle configuration values ? What if those values change ?

Configuration values are placed in a json file which is then imported and used in the code, without hardcoding.
for example google maps api key is placed in `googleMapsConfig.json` file inside config folder, there fore key change has to be made in one place only.

#### 2. What if we encounter an error with the third-party API integration ?

Geocoding is implemented as a service module (`geoCode.js`) which is placed inside the services folder. This service can be imported and the promise based interface returns the resolved result or the rejected promise error object which is then used to send error response in json format.

#### 3. Will it break our application, or they handled accordingly ?

No it will not break the application as they are gracefully handled.

#### 4. Changing the third-party API or refactoring the solution for future API changes seamlessly. How to do it in isolation ?

As explained before, Geocoding is implemented as a service module (`geoCode.js`) which is placed inside the services folder. The API services are completely independent of the google maps geocoding, therefore any changes in the geocoding service will not affect the functionality of API services. Geocoding module exposes an object called `geoCodeLib` which has the method `getGeoCode()`, which returns the geocoding api response once resolved or the error object once rejected. Third party api changes can be done here.
