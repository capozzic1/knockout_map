//yelp info for each location
//image of each location
//weather for the area
//learn how to use node's internal debugger
//move on with getting data to Yelp
var Module = (function () {
	  
	  var markers=[];
	  var contents=[];
	  var infoWindows = [];
	  //model data
	  var locations = [
	  {name:'Le Thai', coords:{lat:36.168743, lng:-115.139866}},
	  {name:'Atomic Liquors', coords:{lat:36.166782, lng:-115.13551}},
      {name:'The Griffin', coords:{lat:36.168785, lng:-115.140329}},
	  {name:'Pizza Rock', coords:{lat:36.17182, lng:-115.142304}},
	  {name:'Mob Museum', coords:{lat:36.172815,lng:-115.141242}},
	  {name:'Joe Vicari’s Andiamo Italian Steakhouse', coords:{lat:36.169437, lng:-115.142903}},
	  {name:'eat', coords:{lat:36.166535, lng:-115.139067}},
	  {name:'Hugo’s Cellar', coords:{lat:36.169915, lng:-115.143861}},
	  {name:'Therapy', coords:{lat:36.169041, lng:-115.139829}},
	  {name:'Vegenation', coords:{lat:36.167401, lng:-115.139453}}
	
	  ];


      var initMap = function () {
	    var map;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:  36.167059, lng: -115.135555},
          zoom: 15
        });

		for (var i = 0; i < locations.length; i++) {
			
		//make markers
			markers[i] = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i].coords.lat, locations[i].coords.lng),
				map: map,
				title: locations[i].name
			});
			
			markers[i].index = i; //add index
			
			
			contents[i] = '<div class="popup_container"></div>';
			
			infoWindows[i] = new google.maps.InfoWindow({
				content: contents[i],
				maxWidth: 300
			});
			
			google.maps.event.addListener(markers[i], 'click', function(){
				console.log(this.index);
				infoWindows[this.index].open(map,markers[this.index]);
				map.panTo(markers[this.index].getPosition());
			});
			
		};
      };
	  
	  //http://localhost:3000/
	
	  //convert array to JSON 
	  var jsonStr = JSON.stringify(locations);
	
		$.ajax({
		url: 'http://localhost:3000/',
		type: "POST",
		contentType: "application/json",  // <====
		data: jsonStr,
		success: function(data){
		 //empty for now
		}
	});
	 

	  
	  return { 
		initMap: initMap
	  };

	  
	  
	  

	
})();