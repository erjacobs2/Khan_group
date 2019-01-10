var url = "/";

var myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

function buildMap() {
d3.json(url, function(response) {

  console.log(response);
  fire = response[0];
  // var heatArray = [];

  var year1992 = [];
  var year2002 = [];
  var year2012 = [];

  var causeArson = [];
  var causeLight = [];
  var causeCampfire = [];


  for (var i = 0; i < fire.lat.length; i++) {
    //var location = response[i].location;

    //if (location) {
    // heatArray.push([fire.lat[i], fire.lng[i]]);
    //}
    //console.log(fire.year, fire.lat[i], fire.lng[i]);
    if (fire.year[i] === "1992") {
      year1992.push([fire.lat[i], fire.lng[i]]);
    } else if (fire.year[i] === "2002") {
      year2002.push([fire.lat[i], fire.lng[i]]);
      } else if (fire.year[i] === "2012") {
      year2012.push([fire.lat[i], fire.lng[i]])
      };

    if (fire.cause[i] === "Arson") {
      causeArson.push([fire.lat[i], fire.lng[i]]);
    } else if (fire.cause[i] === "Lightning") {
      causeLight.push([fire.lat[i], fire.lng[i]]);
      } else if (fire.cause[i] === "Campfire") {
      causeCampfire.push([fire.lat[i], fire.lng[i]])
      };
    }
  
  var test92 = L.heatLayer(year1992, {
    radius: 15,
    blur: 5,
  })

  var test02 = L.heatLayer(year2002, {
    radius: 15,
    blur: 5,
  })

  var test12 = L.heatLayer(year2012, {
    radius: 15,
    blur: 5,
  })

  var cause1 = L.heatLayer(causeArson, {
    radius: 15,
    blur: 5
  })

  var cause2 = L.heatLayer(causeLight, {
    radius: 15,
    blur: 5
  })

  var cause3 = L.heatLayer(causeCampfire, {
    radius: 15,
    blur: 5
  })  

  var overlayMaps = {
    "1992": test92,
    "2002": test02,
    "2012": test12
  }

  var causeOverlay = {
    "Arson": cause1,
    "Lightning": cause2,
    "Campfire": cause3
  }
  // console.log(year1992);
  // console.log(year2002);
  // console.log(year2012);

 
  L.control.layers(overlayMaps, causeOverlay, {
    // collapsed: true
  }).addTo(myMap);
  
});
};

buildMap();
