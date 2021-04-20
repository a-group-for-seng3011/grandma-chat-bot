const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
    const start_date = request.query;
    const end_date = request.query;
    const keyterms = request.query;
  
  const dateObject = {
    articles: "daaaw"
  };
    
  const userAttributes = {
    set_attributes: dateObject
  };
  
  response.json(userAttributes);
});


module.exports = router;
