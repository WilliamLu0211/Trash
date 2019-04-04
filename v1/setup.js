var width = 960, height = 650, centered;

   // var projection = d3.geoAlbersUsa()
   //  .scale(1070)
   //  .translate([width / 2, height / 2]);

var path = d3.geoPath();
// .projection(projection);

var svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height);
            // .style("border", "1px solid");

svg.append("rect")
   .attr("class", "background")
   .attr("width", width)
   .attr("height", height)
   .on("click", clicked);

var g = svg.append("g");

d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
  if (error) throw error;

  g.append("g")
   .attr("id", "states")
   .selectAll("path")
   .data(topojson.feature(us, us.objects.states).features)
   .enter().append("path")
   .attr("d", path)
   .on("click", clicked);

  g.append("path")
   .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
   .attr("id", "state-borders")
   .attr("d", path);
});

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
   .classed("active", centered && function(d) { return d === centered; });

  g.transition()
   .duration(750)
   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
   .style("stroke-width", 1.5 / k + "px");
}

var cd = document.getElementById("cd");
var lcr = document.getElementById("lcr");

cd.addEventListener('click', function(){
  cd.setAttribute("class", "btn btn-primary");
  lcr.setAttribute("class", "btn btn-secondary");
});

lcr.addEventListener('click', function(){
  lcr.setAttribute("class", "btn btn-primary");
  cd.setAttribute("class", "btn btn-secondary");
});
