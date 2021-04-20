'use strict';

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
    if (keyterms === '') {
        keyterms = undefined;
    } else if (location === '') {
        location = undefined;
    }
    const outbreakAPI = new OutbreakAPI(
        start_date,
        end_date,
        keyterms,
        location
    );
    const result = myfunc(start_date, end_date, keyterms, undefined);
    let urls = [];
    let symptoms = [];
    let datePu = [];
    result.then(function(res) {
         // console.log(res);
        const sortedActivities = res.sort(
            (a, b) => Date(Date.parse(b.date_of_publication)) - Date(Date.parse(a.date_of_publication))
          // new Date(Date.parse('01-01-1970 01:03:44'))
        );
        for (var i = 0; i < sortedActivities.length; i++) {
            var r = sortedActivities[i].reports;
            for (var j = 0; j < r.length; j++) {
                if (r[j].syndromes.length !== 0) {
                    symptoms.push(r[j].syndromes);
                }
            }
            urls.push(sortedActivities[i].url);
            datePu.push(sortedActivities[i].date_of_publication);
        }
        var s1 = urls.join('\n');
        var s2 = symptoms.join(',');
        response.json({
            set_attributes: {
                urls: s1,
                symptoms: s2,
                datePu: datePu,
            },
        });
        res_copy = res;

        console.log(res_copy);
    });
});

module.exports = router;
