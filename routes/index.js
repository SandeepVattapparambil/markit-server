var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  let reponse = {
    success: true,
    status: "OK",
    message: "markit-server is successfully"
  };
  res.status(200);
  res.json(reponse);
});

module.exports = router;
