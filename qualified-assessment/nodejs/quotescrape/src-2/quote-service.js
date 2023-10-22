const express = require("express");
const { router, initialise } = require("./router");

const createService = () => {
  const app = express();
  app.use(express.json());

  // Adding routes from external file
  app.use(router);

  initialise();

  return app;
};

module.exports = { createService };
