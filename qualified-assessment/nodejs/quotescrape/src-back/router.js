const express = require('express');
const router = new express.Router()

const { fetchQuotes, fetchBios, fetchQuotesByTag } = require('./scraper');

// Handle /quotes endpoint with author and tag as
// valid query parameters
router.get('/quotes',
    (req, res) => {
        let tagName = req.query.tag;
        console.log('Tagname: ' + tagName);
        if (tagName != undefined) {
            fetchQuotesByTag(tagName).then((quotes) => {
                var result = quotes;
                let author = req.query.author;
                console.log("author -> " + author);
                if (author != undefined) {
                    result = quotes.filter(quote => quote.author == author
                    );
                }

                return res.send({ "data": result });
            }).catch((error) => {
                return res.send({ "data": [] });
            });
        } else {

            fetchQuotes().then((quotes) => {
                var result = quotes;

                let author = req.query.author;
                if (author != undefined) {
                    result = quotes.filter(quote => quote.author == author
                    );
                }

                return res.send({ "data": result });
            }).catch((error) => {
                return res.send({ "data": [] });
            });
        }

    }
);

// Handle /authors endpoint with name as
// valid query parameter
router.get('/authors',
    (req, res) => {
        let name = req.query.name;
        if (name != undefined) {
            fetchBios([name]).then((bios) => {
                return res.send({ "data": bios });
            }).catch((error) => {
                return res.send({ "data": [] });
            });
        } else {

            fetchQuotes().then((quotes) => {
                let allAuthors = quotes.map(quote => quote.author);
                for (let i in allAuthors) {
                    if (allAuthors[i] == "Alexandre Dumas fils") {
                        allAuthors[i] = "Alexandre Dumas-fils";
                    }
                }
                let requiredAuthors = new Set(allAuthors);

                fetchBios(requiredAuthors).then((bios) => {
                    return res.send({ "data": bios });
                });

            }).catch((error) => {
                return res.send({ "data": [] });
            });
        }
    }
);


// Simple home page route for status check
router.get('*',
    (req, res) => {
        res.send({ "data": [] });
    }
);


module.exports = router