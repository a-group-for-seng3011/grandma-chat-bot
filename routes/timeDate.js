const express = require('express');
const axios = require('axios');
const OutbreakAPI = require("./services/outbreak-api");

const router = express.Router();

router.get('/', (request, response) => {
  
  
  const start_date = request.query;
  const end_date = request.query;
  const keyterms = request.query;
  
  const outbreakAPI = new OutbreakAPI(start_date, end_date, keyterms, undefined);
  const articles = outbreakAPI.getSortedArticles();
  const userAttributes = {
    set_attributes: articles
  };
  console.log("hey");

  response.json(userAttributes);
});


module.exports = router;
