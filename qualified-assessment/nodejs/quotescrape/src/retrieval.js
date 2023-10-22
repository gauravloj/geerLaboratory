const axios = require("axios");
const cheerio = require("cheerio");

const baseURL = "http://quotes.toscrape.com";
const quotesURL = `${baseURL}/page/`;
const pages = 10;
const maxFieldLength = 50;

var allQuotes = [];
var allAuthors = [];

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

const parseAuthorURLs = (body, name) => {
  if (name) {
    let validAuthor = name
      .replace(". ", "-")
      .replace(/\./g, "-")
      .replace(/ /g, "-")
      .replace("é", "e");
    validAuthor = validAuthor.replace("'", "");
    if (validAuthor.endsWith("-")) {
      validAuthor = validAuthor.slice(0, -1);
    }
    return [baseURL + "/author/" + validAuthor];
  }
  const res = [];
  const $ = cheerio.load(body);

  $('a:contains("(about)")').each((i, e) => {
    res.push(baseURL + $(e).attr("href"));
  });

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

const getAuthorBodies = async (name = undefined) => {
  let authorURLs;
  if (name) {
    authorURLs = parseAuthorURLs(null, name);
  } else {
    if (allQuotes.length == 0) {
      allQuotes = await quoteBodies;
    }
    authorURLs = [].concat(
      ...allQuotes.map((e) => parseAuthorURLs(e.data, null))
    );
  }
  const requests = [...new Set(authorURLs)].map((url) => axios.get(url));
  return Promise.all(requests);
};

const flatten = (xss) => [].concat(...xss);

const getQuotes = async () => {
  let rs = null;
  if (allQuotes.length > 0) {
    rs = allQuotes;
  } else {
    rs = await quoteBodies;
    allQuotes = rs;
  }

  return flatten(rs.map((e) => parseQuotes(e.data)));
};

const getAuthors = async (name) => {
  let reqAuthors = allAuthors;
  if (name) {
    reqAuthors = await getAuthorBodies(name);
  } else if (reqAuthors.length == 0) {
    allAuthors = await getAuthorBodies();
    reqAuthors = allAuthors;
  }
  res = flatten(reqAuthors.map((e) => parseAuthorInfo(e.data)));
  if (res[0].name == "") {
    res = [];
  }
  return res;
};

module.exports = { getQuotes, getAuthors };
