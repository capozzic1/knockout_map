var Module = (function () {
	  

	  //model data
	  var locations = [
	  {name:'Le Thai', coords:{lat:36.168743, lng:-115.139866}},
	  {name:'Atomic Liquors', coords:{lat:36.166782, lng:-115.13551}},
      {name:'The Griffin', coords:{lat:36.168785, lng:-115.140329}},
	  {name:'Pizza Rock', coords:{lat:36.17182, lng:-115.142304}}
	
	  ]
	  

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