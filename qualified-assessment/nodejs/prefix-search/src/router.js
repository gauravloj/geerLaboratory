const express = require('express');
const router = new express.Router();
const { fetchMatches } = require('./parser');


router.get('/',
    (req, res) => {
        let prefix = req.query.stem;
        if (prefix == undefined) {
            prefix = "";
        }
        fetchMatches(prefix).then((response) => {
            return res.send({ "data": response });
        });
    }
);

module.exports = router;