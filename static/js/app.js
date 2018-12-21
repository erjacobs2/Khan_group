// function buildMap() {
//     /* data route */
//   var url = "/";
//     //   SHOULD LOOK SOMETHING LIKE "/api/pals"
//   d3.json(url).then(function(response) {

//     console.log(response);

//     var data = response;
    
    // CODE TO BUILD MAP GOES HERE
    // whatever whatever some data to test and shit
    console.log("test");
    
    var fire = [
      {
        name: "Paris",
        location: [48.8566, 2.3522]
      },
      {
        name: "Lyon",
        location: [45.7640, 4.8357]
      },
      {
        name: "Cannes",
        location: [43.5528, 7.0174]
      },
      {
        name: "Nantes",
        location: [47.2184, -1.5536]
      }
    ];
    
    var fireLocations = [];

    for (var i = 0; i < fire.length; i++) {
      fireLocations.push(
        L.marker(fire[i].location).bindPopup("<h1>" + fire[i].name + "</h1>")
      );
    }

    var fireLayer = L.layerGroup(fireLocations);

    var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });

    var baseMaps = {
      Dark: dark 
    };

    var overlayMaps = {
      Fires: fireLayer
    };

    var myMap = L.map("map", {
      center: [46.2276, 2.2137],
      zoom: 6,
      layers: [dark, fireLayer]
    });

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

