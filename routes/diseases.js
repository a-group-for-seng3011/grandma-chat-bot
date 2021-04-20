"use strict";

const express = require('express');
const axios = require('axios');
const OutbreakAPI = require('../services/outbreak-api');
let res_copy;

async function myfunc(start_date, end_date, keyterms, undefined) {
    const outbreakAPI = new OutbreakAPI(
        start_date,
        end_date,
        keyterms,
        undefined
    );
    const articles = await outbreakAPI.getArticles();
    return articles;
}

const router = express.Router();
router.get('/diseases', (request, response) => {
    const start_date = request.query.start_date;
    const end_date = request.query.end_date;
    const keyterms = request.query.keyterms;
    const location = request.query.location;
    if (keyterms === "") {
      keyterms = undefined;
    } else if (location === "") {
      location = undefined;
    }
    const outbreakAPI = new OutbreakAPI(
        start_date,
        end_date,
        keyterms,
        location
    );
    const result = myfunc(start_date, end_date, keyterms, undefined);
    result.then(function (res) {
        res_copy = res;
        response.json({
            set_attributes: res,
        });
    });
});

console.log(res_copy);

module.exports = router;
