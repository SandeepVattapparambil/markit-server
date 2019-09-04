const enhanceResponse = (req, res, next) => {
  (function enableCORS() {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type");
    } catch (error) {
      log.error(`CORS setup failed due to: ${error}`);
    }
  })();
  next();
};

module.exports = enhanceResponse;
