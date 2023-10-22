const axios = require("axios");

// Creating a common axois client
const axiosClient = axios.create({
    baseURL: "https://raw.githubusercontent.com"
});

// Single function to hit any url and return a promise
function get(url) {
    return axiosClient.get(url);
}

function fetchMatches(pattern) {

    while (true) {
        if (global.isReady) {
            if (pattern == '') {
                return Promise.resolve(global.words);
            }
            let start = getStartIndex(pattern);
            let end = getEndIndex(pattern);
            return Promise.all([start, end]).then((results) => {
                return global.words.slice(start, end + 1);
            });
        }
    }
}

function getEndIndex(pattern) {
    // let start = 0;
    // let end = global.words.length;
    // let patternFound = false;

    // while (start <= end) {
    //     mid = start + (end - start) / 2;
    //     if (global.words[mid].startsWith(pattern)) {
    //         patternFound = true;
    //         start = mid + 1;
    //     } else {
    //         if (patternFound) {
    //             end = mid - 1;
    //         }
    //     }
    // }
    return 0;
}

function getStartIndex(pattern) {
    return 0;
}

function fetchWords() {
    return get("qualified/challenge-data/master/words_alpha.txt").then((response) => {
        let words = response.data.split('\r\n');
        return words;
    });
}

module.exports = { fetchMatches, fetchWords };