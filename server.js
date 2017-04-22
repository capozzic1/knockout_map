var Module = (function () {
	'use strict';
	
	var cors = require('cors');
	var debug = require('debug')('app');
	var express = require('express');
	var http = require('http');
	var bodyParser = require('body-parser');
	var app = express();
	var name = "server";
	var yelpInData = [];

	var port = process.env.PORT || 8080;

	const yelp = require('yelp-fusion');

	//const client = yelp.client(token);
	app.listen(port, function () {
		console.log('Example app listening on port' + port);
	});

	//allow cors
	app.use(cors());
	// create application/json parser
	app.use(bodyParser.json());
	// create application/x-www-form-urlencoded parser
	app.use(bodyParser.urlencoded({
			extended: true
		}));

	//handle post requests
	app.post('/p', function (req, res) {

		req.body.forEach((item) => {
			yelpInData.push(item);
		});

		yelp.accessToken('euqH0_vzVDHpkWNkOrRvRg', 'zBM0qybw8qfqd6Rp9l9qef3i8niXOfM2oft0IHx68yxhBPNfehHA0r6pfULQunN9')
		.then(response => {
			const client = yelp.client(response.jsonBody.access_token);

			debug('test');
	
			var yelpOutData = [];




			yelpInData.forEach(function (item, i) {
				let coords = yelpInData[i].coords.lat + "," + yelpInData[i].coords.lng;
				let name = yelpInData[i].name;

				client.search({
					term: name,
					location: coords

				}).then(response => {
			
					//name, img url, review count, rating, price, location.display address, is closed,phone
					yelpOutData.push({
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

					
					if (yelpOutData.length === yelpInData.length) {
						res.send(yelpOutData);
						yelpInData = [];
						yelpOutData = [];
						
					} else if (yelpOutData.length > yelpInData.length) {
						debug('over len');
					}

			

				}).catch (e => {
					console.log(e);
				});
			});




		}).catch (e => {
			console.log(e);
		});

	
	});

})();
