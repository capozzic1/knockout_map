const Module = (function() {
  'use strict';

  const cors = require('cors');
  const debug = require('debug')('app');
  const express = require('express');
  const http = require('http');
  const bodyParser = require('body-parser');
  const app = express();
  const name = "server";

  const Promise = require('promise');
  const port = process.env.PORT || 8080;

  const yelp = require('yelp-fusion');
  const client = yelp.client('b949muszPxlQ1MQEAboWnFbRBK_On-XD4qKsyP4VDIx9bCeaeWAv5BYxwzBYU9VvnpffitkF6VMVR8EuzfgvWfV4FwZO0mXmgdq4y__cnj5dlukfDra9-v0-Dv_cWHYx')
  app.use(express.static('public'));

  //const client = yelp.client(token);
  app.listen(port, function() {
    console.log('Example app listening on port' + port);
  });

  //allow cors
  app.use(cors());
  // create application/json parser
  app.use(bodyParser.json());
  // create application/x-www-form-urlencoded parser
  app.use(bodyParser.urlencoded({extended: true}));

  //handle post requests for getting yelp data
  app.post('/post', async function(req, res) {
    let yelpInData = []
    let result = null;
    req.body.forEach((item) => {
      yelpInData.push(item);
    });

    result = await handleYelp(yelpInData);
    //send data back to the front end
    res.send(result);

  });

  //handle yelp api
  async function handleYelp(yelpInData) {
    let yelpData = [];

    for (let i = 0, len = yelpInData.length; i < len; i++) {
      let result = await searchPlace(yelpInData[i]);
      yelpData.push(result);
    }
    //  console.log(yelpData);
    return yelpData;

  }

  function searchPlace(city) {
    //console.log(city)
    return new Promise((resolve) => {
      setTimeout(() => {
        let coords = city.coords.lat + "," + city.coords.lng;
        let name = city.name;

        client.search({term: name, location: coords}).then(response => {

          //name, img url, review count, rating, price, location.display address, is closed,phone
          resolve({
            name: response.jsonBody.businesses[0].name,
            img: response.jsonBody.businesses[0].image_url,
            hours: response.jsonBody.businesses[0].is_closed,
            revcount: response.jsonBody.businesses[0].review_count,
            rating: response.jsonBody.businesses[0].rating,
            price: response.jsonBody.businesses[0].price,
            location: response.jsonBody.businesses[0].location.display_address.toString(),
            phone: response.jsonBody.businesses[0].display_phone,
            url: response.jsonBody.businesses[0].url
          });

        }).catch(e => {
          console.log(e);
        });
      }, 100);
    })
  }

  module.exports = app;
})();
