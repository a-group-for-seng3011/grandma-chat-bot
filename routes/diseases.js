"use strict";

const express = require('express');
const axios = require('axios');
const OutbreakAPI = require('../services/outbreak-api');

async function myfunc(start_date, end_date, keyterms, undefined) {
    console.log(start_date);
    const outbreakAPI = new OutbreakAPI(
        start_date,
        end_date,
        keyterms,
        undefined
    );
    // console.log(outbreakAPI);
    const articles = await outbreakAPI.getArticles();
    return articles;
}

const router = express.Router();
router.get('/', (request, response) => {
    const start_date = request.query.start_date;
    const end_date = request.query.end_date;
    const keyterms = request.query;
    const outbreakAPI = new OutbreakAPI(
        start_date,
        end_date,
        keyterms,
        undefined
    );
    const articles = outbreakAPI.getArticles();
    const userAttributes = {
        set_attributes: {
            articles: myfunc(start_date, end_date, keyterms, undefined),
        },
    };

    response.json(userAttributes);
});

module.exports = router;
