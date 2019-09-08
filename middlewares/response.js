/**
 * @function enhanceResponse
 * A middleware to enhance the response object with CORS headers
 * @param {*} req - The express request object
 * @param {*} res - The express response object
 * @param {*} next - The middleware in the middleware chain
 */
const enhanceResponse = (req, res, next) => {
  (function enableCORS() {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type");
    } catch (error) {
      console.error(`CORS setup failed due to: ${error}`);
    }
  })();
  next();
};

module.exports = enhanceResponse;
