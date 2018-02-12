var Module = (function() {

  var markers = [];
  var contentsBefSort = [];
  var infoWindows = [];
  var contentsNew = [];
  var ready = false;

  //model data
  var locations = [
    {
      name: 'Le Thai',
      coords: {
        lat: 36.168743,
        lng: -115.139866
      }
    }, {
      name: 'Atomic Liquors',
      coords: {
        lat: 36.166782,
        lng: -115.13551
      }
    }, {
      name: 'The Griffin',
      coords: {
        lat: 36.168785,
        lng: -115.140329
      }
    }, {
      name: 'Pizza Rock',
      coords: {
        lat: 36.17182,
        lng: -115.142304
      }
    }, {
      name: 'The Mob Museum',
      coords: {
        lat: 36.172815,
        lng: -115.141242
      }
    }, {
      name: "Joe Vicari's Andiamo Italian Steakhouse",
      coords: {
        lat: 36.169437,
        lng: -115.142903
      }
    }, {
      name: 'eat.',
      coords: {
        lat: 36.166535,
        lng: -115.139067
      }
    }, {
      name: "Hugo's Cellar",
      coords: {
        lat: 36.169915,
        lng: -115.143861
      }
    }, {
      name: 'Therapy',
      coords: {
        lat: 36.169041,
        lng: -115.139829
      }
    }, {
      name: 'VegeNation',
      coords: {
        lat: 36.167401,
        lng: -115.139453
      }
    }

  ];

  //convert array to JSON
  var jsonStr = JSON.stringify(locations);
  //'https://gentle-fortress-70127.herokuapp.co/p',
  $.ajax({
    url: '/p', type: "POST", contentType: "application/json", // <====
    data: jsonStr,
    success: function(data) {

      (data);
      $.each(data, function(i, location) {
        var htmlStr = "";
        var hours = "";
        console.log(location.hours);
        if (location.hours == false) {
          hours = "Is closed";
        } else {
          hours = "Is open";
        }

        htmlStr += '<div class ="info">' + '<h2 class="name">' + location.name.toString() + '</h2>' + '<img class="buspic" src=' + location.img + " alt text='bus pic'" + '/>' + '<p class="hours">' + "<b>Open or closed: </b>" + hours + '</p>' + '<p class="reviews">' + "<b>Review count: </b>" + location.revcount + '</p>' + '<p class="rating">' + "<b>Rating: </b>" + location.rating + '</p>' + '<p class="price">' + "<b>Price range: </b>" + location.price + '</p>' + '<p class="location">' + "<b>Address: </b>" + location.location + '</p>' + '<p class="phone">' + "<b>Phone: </b>" + location.phone + '</p>' + '<a href="' + location.url + '">' + 'See more on yelp' + '</a>' + '</div>';

        contentsBefSort.push(htmlStr);

      });

      sortArr(contentsBefSort);

      if (ready) {
        weatherData(function(data) {
          console.log(data);
          var city = data.name;
          var currWeather = data.weather[0].description;
          var pic = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
          var currTemp = data.main.temp;
          var tempHi = data.main.temp_max;
          var humid = data.main.humidity;

          var div = '<div class="weatherIn"></div>';
          $('body').append(div);

          $('.weatherIn').append('<h2>Weather for Downtown ' + city + '</h2>' + '<p>Description: ' + currWeather + '</p>' + '<img src="' + pic + '" alt="Pic here" />' + '<p>Current temperature: ' + currTemp + '&#8457' + '</p>' + '<p>The high for today is ' + tempHi + '&#8457' + '</p>' + '<p>Humidity: ' + humid + '</p>');

        });
        initMap();

      }
    }
  });
  function sortList() {

    $('.search').keyup(function(e) {
      var val = $('.search').val();
      var list = $('.btns li');
      if (val != "") {
        $(list).css("display", "none");
        $(list).each(function(i) {
          var h2text = $(this).find('h2').text();

          if (h2text.includes(val)) {

            $(this).css("display", "block");

          }
        });
      } else {
        $(list).css("display", "block");
      }

    });

  };

  function sortArr(arr) {

    for (var j = 0; j < locations.length; j++) {

      for (var i = 0; i < arr.length; i++) {

        if (arr[i].indexOf(locations[j].name) > -1 || arr[i].indexOf(locations[j].name) == 0) {

          contentsNew[j] = arr[i];

        }
      }
    }

    ready = true;
  };

  function weatherData(callback) {
    var weather = 'https://api.openweathermap.org/data/2.5/weather?lat=36.168743&lon=-115.139866&units=imperial&APPID=ef73411c829a4563b61b64e76cb72976';

    $.ajax({dataType: "jsonp", url: weather, success: callback});
  };

  var initMap = function() {

    $('	<input type="text" placeholder="Search here" class="search" value="" />').insertBefore('.btns');

    if (ready) {
      var map;
      map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 36.168743,
          lng: -115.139866
        },
        zoom: 15
      });

      for (let i = 0; i < locations.length; i++) {

        //make markers
        markers[i] = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i].coords.lat, locations[i].coords.lng),
          map: map,
          title: locations[i].name
        });

        markers[i].index = i; //add index

        $('.btns').append('<li>' + contentsNew[i] + '</li>');

        var infoWindow = new google.maps.InfoWindow();

        infoWindow.setOptions({maxWidth: 250});

        google.maps.event.addListener(markers[i], 'click', function() {
          (this.index);
          infoWindow.setContent([contentsNew[i]].toString());
          infoWindow.open(map, markers[this.index]);
          map.setZoom(16);
          map.panTo(markers[this.index].getPosition());
        });
        var list = $('.btns li');
        //console.log(list[i]);
        google.maps.event.addDomListener(list[i], 'click', function() {
          infoWindow.setContent([contentsNew[i]].toString());
          map.setZoom(16);
          infoWindow.open(map, markers[i]);
          map.panTo(markers[i].getPosition());
        });

        var mapCenter = new google.maps.LatLng(36.168743, -115.139866);

        google.maps.event.addListener(infoWindow, 'closeclick', function() {
          map.setCenter(mapCenter);
          map.setZoom(15);
        });
      };
    };

    sortList();

  };

  return {initMap: initMap};

})();
