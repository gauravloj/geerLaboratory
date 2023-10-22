const express = require("express");
const { getAuthors, getQuotes } = require("./retrieval");

const createService = () => {
  const app = express();

  app.get("/quotes", async (req, res) => {
    let data = await getQuotes();

    if (req.query.tag) {
      data = data.filter((e) => e.tags.includes(req.query.tag));
    }

    if (req.query.author) {
      data = data.filter((e) => e.author === req.query.author);
    }

    res.json({ data: data });
  });

  app.get("/authors", async (req, res) => {
    let data;
    if (req.query.name) {
      data = await getAuthors(req.query.name);
    } else {
      data = await getAuthors();
    }

    res.json({ data: data });
  });

  return app;
};

module.exports = { createService };
