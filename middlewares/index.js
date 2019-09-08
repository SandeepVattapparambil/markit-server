/**
 * Middlewares index
 */
const express = require("express");
const middlewareRouter = express.Router();

middlewareRouter.use(require("./response"));

module.exports = middlewareRouter;
