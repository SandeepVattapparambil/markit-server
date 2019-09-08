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

payload body

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
