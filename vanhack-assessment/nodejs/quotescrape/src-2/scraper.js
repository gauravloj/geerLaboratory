const axios = require("axios");
const cheerio = require("cheerio");

// Creating a common axois client
const axiosClient = axios.create({
    baseURL: 'http://quotes.toscrape.com/'
});

// Single function to hit any url and return a promise
function get(url) {
    return axiosClient.get(url);
}


// This function takes a list of authors and returns
// a promise of Author's Bios
function fetchBios(authors) {
    var promises = [];

    for (let author of authors) {
        // Replace any "space" or "." with "-"
        // Replace non-ascii character 'é' with ascii 'e'
        // Remove any - as a suffix
        let validAuthor = author.replace('. ', '-').replace(/\./g, '-').replace(/ /g, '-').replace('é', 'e');
        validAuthor = validAuthor.replace('\'', '');
        if (validAuthor.endsWith('-')) {
            validAuthor = validAuthor.slice(0, -1);
        }
        let url = 'author/' + validAuthor;
        promises.push(get(url));
    }

    // Once all the promises are resolved, their responses
    // are compiled to get author's bio information
    return Promise.all(promises).then((results) => {
        var allBios = [];
        for (let response of results) {
            const $ = cheerio.load(response.data);

            let author = '';

            try {
                let authorTag = $('.author-title')[0].children;
                if (authorTag.length > 0) {
                    console.log(authorTag);
                    author = $('.author-title')[0].children[0].data;
                }

                let born = '';
                let bornTag = $('.author-born-date')[0].children;
                if (bornTag.length > 0) {
                    born = $('.author-born-date')[0].children[0].data;
                }

                let bio = '';
                let bioTag = $('.author-description')[0].children;
                if (bioTag.length > 0) {
                    bio = $('.author-description')[0].children[0].data;
                    bio = bio.trim().slice(0, 50);
                }

                let location = '';
                let locationTag = $('.author-born-location')[0].children;
                if (locationTag.length > 0) {
                    location = $('.author-born-location')[0].children[0].data;
                }

                if (author != '') {
                    allBios.push({
                        "name": author,
                        "biography": bio,
                        "birthdate": born,
                        "location": location
                    });

                }
            } catch (error) {
                console.log(error);
                return []
            }
        }
        return allBios;
    }).catch(error => {
        console.error(error.message);
        return [];
    });
}

// This function returns a promise
// for all the quotes
function fetchQuotes() {
    var urls = [
        "",
        "/page/2/",
        "/page/3/",
        "/page/4/",
        "/page/5/",
        "/page/6/",
        "/page/7/",
        "/page/8/",
        "/page/9/",
        "/page/10/"
    ]
    var promises = []

    for (let url of urls) {
        console.log(url);
        promises.push(get(url));
    }

    return Promise.all(promises).then((results) => {
        var allQuotes = [];
        for (let response of results) {
            const $ = cheerio.load(response.data);
            const quotes = $(".quote");
            quotes.each((idx, elem) => {
                let quoteText = $(elem).find('.text')[0].children[0].data
                let author = $(elem).find('.author')[0].children[0].data
                let tags = $(elem).find('.tags');
                let children = $(tags).find('.tag');
                let allTags = []
                if (children.length > 0) {
                    $(tags).find('.tag').each((i, el) => {
                        allTags.push(el.children[0].data);
                    })
                }
                console.log(allTags);
                allQuotes.push({
                    "author": author,
                    "text": quoteText.trim().slice(0, 50),
                    "tags": allTags
                });
            });
        }
        return allQuotes;
    }).catch(error => {
        console.error(error.message);
        return [];
    });
}

// This function returns a promise
// for all the quotes
function fetchQuotesByTag(tagName) {
    var urls = [
        "/tag/" + tagName + "/page/1/",
        "/tag/" + tagName + "/page/2/",
    ]
    var promises = []

    for (let url of urls) {
        promises.push(get(url));
    }

    return Promise.all(promises).then((results) => {
        var allQuotes = [];
        for (let response of results) {
            const $ = cheerio.load(response.data);
            const quotes = $(".quote");
            if (quotes.length > 0) {
                quotes.each((idx, elem) => {
                    let quoteText = $(elem).find('.text')[0].children[0].data
                    let author = $(elem).find('.author')[0].children[0].data
                    let tags = $(elem).find('.tags');
                    let children = $(tags).find('.tag');
                    let allTags = []
                    if (children.length > 0) {
                        $(tags).find('.tag').each((i, el) => {
                            allTags.push(el.children[0].data);
                        })
                    }
                    allQuotes.push({
                        "author": author,
                        "text": quoteText.trim().slice(0, 50),
                        "tags": allTags
                    });
                });
            }
        }
        return allQuotes;
    }).catch(error => {
        console.error(error.message);
        return [];
    });
}

module.exports = { fetchQuotes, fetchBios, fetchQuotesByTag };