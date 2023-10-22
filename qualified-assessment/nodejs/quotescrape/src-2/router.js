const express = require('express');
const router = new express.Router()

const { fetchQuotes, fetchBios, fetchQuotesByTag } = require('./scraper');

var allQuotes = [];
var allBios = {};

function initialise() {

    fetchQuotes().then((quotes) => {
        allQuotes = quotes;
    });

    let allAuthors = allQuotes.map(quote => quote.author);
    for (let i in allAuthors) {
        if (allAuthors[i] == "Alexandre Dumas fils") {
            allAuthors[i] = "Alexandre Dumas-fils";
        }
    }
    let requiredAuthors = new Set(allAuthors);

    fetchBios(requiredAuthors).then((bios) => {
        bios.forEach((bio) => {
            allBios[bio.name] = bio;
        });
    }).catch((error) => {
        console.log(error);
    });

}

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


            var result = allQuotes;

            let author = req.query.author;
            if (author != undefined) {
                result = allQuotes.filter(quote => quote.author == author
                );
            }

            return res.send({ "data": result });

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

            let allAuthors = allQuotes.map(quote => quote.author);
            for (let i in allAuthors) {
                if (allAuthors[i] == "Alexandre Dumas fils") {
                    allAuthors[i] = "Alexandre Dumas-fils";
                }
            }
            let requiredAuthors = new Set(allAuthors);

            fetchBios(requiredAuthors).then((bios) => {
                return res.send({ "data": bios });
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


// module.exports = router
module.exports = { router, initialise };