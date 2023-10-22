const axios = require("axios");
const express = require("express");
const router = require("../src/router");
const fs = require('fs');
const { fetchWords } = require('./parser');

global.words = [];
global.isReady = false;

const createService = () => {
    const app = express();
    const dictionaryURL = "https://raw.githubusercontent.com/qualified/challenge-data/master/words_alpha.txt";
    const filePath = "./dict.txt";

    fetchWords().then((response) => {
        global.words = response;
        global.isReady = true;
    });

    app.use(router);

    return app; // instead of app.listen
};

async function downloadFile(fileUrl, outputLocationPath) {
    const writer = fs.createWriteStream(outputLocationPath);

    // const reader = fs.createReadStream(fileUrl);

    return axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
    }).then(response => {
        //ensure that the user can call `then()` only when the file has
        //been downloaded entirely.
        return new Promise((resolve, reject) => {
            response.data.pipe(writer);
            let error = null;
            writer.on('error', err => {
                error = err;
                writer.close();
                reject(err);
            });
            writer.on('close', () => {
                if (!error) {
                    resolve(true);
                }
                //no need to call the reject here, as it will have been called in the
                //'error' stream;
            });
        });
    });
}

module.exports = { createService };