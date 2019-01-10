// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the sqlite database
// =================================
var url = "/";
d3.json(url, function(response) {

  // Step 4: Parse the data
  // Format the data 
  // =================================
  // Create a function to parse year
  var parseTime = d3.timeParse("%y");

  // // Format the data
  yearData.forEach(function(response) {
    response.year = parseTime(response.year);
  });

  // Step 5: Create the scales for the chart
  // =================================
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(response, d => d.year))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear().range([height, 0]);

  // Step 6: Set up the y-axis domain
  // ==============================================
  // determine the max y value
  // find the max of the cause data
  var arsonMax = d3.max(response, d => d.arson);
  var campfireMax = d3.max(response, d => d.campfire);
  var childrenMax = d3.max(response, d => d.children);
  var debrisMax = d3.max(response, d => d.debris);
  var equipmentMax = d3.max(response, d => d.equipment);
  var fireworksMax = d3.max(response, d => d.fireworks);
  var lightningMax = d3.max(response, d => d.lightning);
  var miscMax = d3.max(response, d => d.misc);
  var unknownMax = d3.max(response, d => d.unknown);
  var powerlineMax = d3.max(response, d => d.powerline);
  var railroadMax = d3.max(response, d => d.railroad);
  var smokingMax = d3.max(response, d => d.smoking);
  var structureMax = d3.max(response, d => d.structure);

  //hmmmmm
  var yMax;
  if (arsonMax > lightningMax) {
    yMax = arsonMax;
  }
  else {
    yMax = lightningMax;
  }

  // var yMax = morningMax > eveningMax ? morningMax : eveningMax;

  // Use the yMax value to set the yLinearScale domain
  yLinearScale.domain([0, yMax]);


  // Step 7: Create the axes
  // =================================
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%d-%b"));
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis);

  // Step 9: Set up 13 line generators and append 13 SVG paths
  // ==============================================

  // Line generator for arson caused fires
  var line1 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.arson));

  // Line generator for campire caused fires
  var line2 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.campfire));

  // Line generator for children caused fires
  var line3 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.children));

  // Line generator for debris caused fires
  var line4 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.deris));

  // Line generator for equipment caused fires
  var line5 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.equipment));

  // Line generator for fireworks caused fires
  var line6 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.fireworks));

  // Line generator for lightning caused fires
  var line7 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.lightning));

  // Line generator for misc caused fires
  var line8 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.misc));

  // Line generator for unknown caused fires
  var line9 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.unknown));

  // Line generator for powerline caused fires
  var line10 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.evening));

  // Line generator for railroad caused fires
  var line11 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.railroad));

  // Line generator for smoking caused fires
  var line12 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.smoking));

  // Line generator for structure caused fires
  var line13 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.structure));
  

  // Append a path for line1
  chartGroup
    .append("path")
    .attr("d", line1(response))
    .classed("line green", true);

  // Append a path for line2
  chartGroup
    .data([response])
    .append("path")
    .attr("d", line2)
    .classed("line orange", true);

});
