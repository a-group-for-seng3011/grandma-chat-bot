const express = require('express');
const express = require('axios');

const router = express.Router();

const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

const getUserDateInTimezone = offsetInHours => {
  const utcDate = Date.now();
  
  const offsetInMilliseconds = ONE_HOUR_IN_MILLISECONDS * offsetInHours;
  
  return new Date(utcDate + offsetInMilliseconds);
};

router.get('/', (request, response) => {
  const start_date = request.query;
  const end_date = request.query;
  const keyterms = request.query;
  const token = request.query;
  
  const userDateInTimezone = axios.get(`https://disease-reports-api.herokuapp.com/diseases/?start_date=${start_date}&end_date=${end_date}&keyterms=${keyterms}&token=${token}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  
  const dateObject = {
    day: userDateInTimezone.getDate(),
    month: userDateInTimezone.getMonth() + 1,
    year: userDateInTimezone.getFullYear(),
    hours: userDateInTimezone.getHours(),
    minutes: userDateInTimezone.getMinutes(),
    seconds: userDateInTimezone.getSeconds(),
    isoTime: userDateInTimezone.toISOString()
  };
    
  const userAttributes = {
    set_attributes: userDateInTimezone
  };
  
  response.json(userAttributes);
});


module.exports = router;
