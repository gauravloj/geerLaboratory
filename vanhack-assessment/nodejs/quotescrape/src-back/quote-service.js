const express = require("express");
const router = require("../src/router");

const createService = () => {
    const app = express();
    app.use(express.json());

    // Adding routes from external file
    app.use(router);


    return app;
};


module.exports = { createService };