var Module = (function() {
    'use strict';
	//var levels = require('debug-levels').levels;
	var debug = require('debug')('app');
    var prettyjson = require('prettyjson');
    var express = require('express');
    var http = require('http');
    var cors = require('cors');
    var bodyParser = require('body-parser');
    var app = express();
	//var dbg = debug('myserver:app');
	var name = "server";
	var yelpData = [];
    const yelp = require('yelp-fusion');

	
	debug('testing');
    const token = yelp.accessToken('euqH0_vzVDHpkWNkOrRvRg', 'zBM0qybw8qfqd6Rp9l9qef3i8niXOfM2oft0IHx68yxhBPNfehHA0r6pfULQunN9').then(response => {
        // console.log(response.jsonBody.access_token);
    }).catch(e => {
        console.log(e);
    });
    //allow cors
    app.use(cors());
    // create application/json parser 
    app.use(bodyParser.json());
    // create application/x-www-form-urlencoded parser 
    app.use(bodyParser.urlencoded({
        extended: true
    }));




    app.listen(3000, function() {
        console.log('Example app listening on port 3000');
    });

    //handle post requests
    app.post('/', function(req, res) {
		var test = req.body[0].name;
		//console.log(test);
		req.body.forEach((item) => {
			yelpData.push(item);
		});
		
		
        //var jsonData = JSON.parse(reqbody);


        //console.log(typeof req.body);
        //console.log(prettyjson.render(test));

    });

})();