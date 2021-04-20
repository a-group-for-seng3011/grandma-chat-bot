const express = require('express');
const axios = require('axios');
const OutbreakAPI = require('../services/outbreak-api');

const router = express.Router();

router.get('/', (request, response) => {
    const start_date = request.query;
    const end_date = request.query;
    const keyterms = request.query;

    const outbreakAPI = new OutbreakAPI(
        start_date,
        end_date,
        'Coronavirus',
        undefined
    );
    const articles = outbreakAPI.getArticles();
    console.log(articles);
    const userAttributes = {
        set_attributes: articles,
    };

    response.json(userAttributes);
});

module.exports = router;
