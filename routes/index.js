const express = require("express");
const router = express.Router();

/**
 * Index route
 */
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
