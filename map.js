var Module = (function () {
	  
      var initMap = function () {
	    var map;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:  36.167059, lng: -115.135555},
          zoom: 15
        });
      };
	  
	  return { 
		initMap: initMap
	  };
	
})();