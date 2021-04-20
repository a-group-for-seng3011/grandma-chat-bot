const express = require('express');
const OutbreakAPI = require('');

const router = express.Router();

async function myfunc(start_date, end_date, keyterms) {
    // const outbreakAPI = new OutbreakAPI(
    //     start_date,
    //     end_date,
    //     keyterms,
    //     undefined
    // );
    const outbreakAPI = new OutbreakAPI(
        start_date,
        end_date,
        'Coronavirus',
        undefined
    );

    const articles = await outbreakAPI.getSortedArticles();

    console.log(articles);
    return articles;
}

router.get('/', (request, response) => {
    const start_date = request.query;
    const end_date = request.query;
    const keyterms = request.query;

    // const outbreakAPI = new OutbreakAPI(
    //     start_date,
    //     end_date,
    //     keyterms,
    //     undefined
    // );
    const articles = myfunc(start_date, end_date, keyterms);
    // console.log(articles);

    const dateObject = {
        articles: articles,
    };

    const userAttributes = {
        set_attributes: dateObject,
    };

    response.json(userAttributes);
});

module.exports = router;
