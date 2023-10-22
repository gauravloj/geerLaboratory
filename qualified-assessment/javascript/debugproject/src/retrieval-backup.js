const axios = require("axios");
const cheerio = require("cheerio");

const baseURL = "http://quotes.toscrape.com";
const quotesURL = `${baseURL}/page/`;
const pages = 10;
const maxFieldLength = 50;

const quoteBodies = axios
  .all(
    Array(pages)
      .fill()
      .map((e, i) => axios.get(quotesURL + (i + 1)))
  )
  .catch((err) => {
    throw err;
  });

const parseQuotes = (body) => {
  const res = [];
  const $ = cheerio.load(body);

  $(".quote").each((i, e) =>
    res.push({
      author: $(e).find(".author").text().trim(),
      text: $(e).find(".text").text().trim().slice(0, maxFieldLength),
      tags: $(e)
        .find(".keywords")
        .attr("content")
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e),
    })
  );

  return res;
};

const parseAuthorURLs = (body) => {
  const res = [];
  const $ = cheerio.load(body);

  $('a:contains("(about)")').each((i, e) =>
    res.push(baseURL + $(e).attr("href"))
  );

  return res;
};

const parseAuthorInfo = (body) => {
  const $ = cheerio.load(body);
  return {
    name: $(".author-title").contents().first().text().trim(),
    biography: $(".author-description").text().trim().slice(0, maxFieldLength),
    birthdate: $(".author-born-date").text().trim(),
    location: $(".author-born-location").text().trim(),
  };
};

const getAuthorBodies = async () => {
  const authorURLs = [].concat(
    ...(await quoteBodies).map((e) => parseAuthorURLs(e.data))
  );
  const requests = [...new Set(authorURLs)].map((url) => axios.get(url));
  return Promise.all(requests);
};

const flatten = (xss) => [].concat(...xss);

const getQuotes = async () => {
  const rs = await quoteBodies;
  return flatten(rs.map((e) => parseQuotes(e.data)));
};

const getAuthors = async () => {
  const rs = await getAuthorBodies();
  return flatten(rs.map((e) => parseAuthorInfo(e.data)));
};

module.exports = { getQuotes, getAuthors };
