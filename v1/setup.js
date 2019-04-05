var states = {"53":"Washington",
               "41":"Oregon",
               "06":"California",
               "32":"Nevada",
               "16":"Idaho",
               "49":"Utah",
               "04":"Arizona",
               "35":"New Mexico",
               "08":"Colorado",
               "56":"Wyoming",
               "30":"Montana",
               "38":"North Dakota",
               "46":"South Dakota",
               "31":"Nebraska",
               "20":"Kansas",
               "40":"Oklahoma",
               "48":"Texas",
               "27":"Minnesota",
               "19":"Iowa",
               "29":"Missouri",
               "05":"Arkansas",
               "22":"Louisiana",
               "28":"Mississippi",
               "01":"Alabama",
               "13":"Georgia",
               "12":"Florida",
               "45":"South Carolina",
               "37":"North Carolina",
               "47":"Tennessee",
               "21":"Kentucky",
               "51":"Virginia",
               "54":"West Virginia",
               "24":"Maryland",
               "10":"Delaware",
               "39":"Ohio",
               "18":"Indiana",
               "17":"Illinois",
               "42":"Pennsylvania",
               "34":"New Jersey",
               "55":"Wisconsin",
               "26":"Michigan",
               "36":"New York",
               "09":"Connecticut",
               "44":"Rhode Island",
               "25":"Massachusetts",
               "50":"Vermont",
               "33":"New Hampshire",
               "23":"Maine",
               "02":"Alaska",
               "15":"Hawaii"};

var width = 960, height = 650, centered;

var path = d3.geoPath();

var svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height);

svg.append("rect")
   .attr("class", "background")
   .attr("width", width)
   .attr("height", height)
   .on("click", clicked);

var g = svg.append("g");
var text;

d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
  if (error) throw error;

  g.append("g")
   .attr("id", "states")
   .selectAll("path")
   .data(topojson.feature(us, us.objects.states).features)
   .enter().append("path")
   .attr("d", path)
   .on("click", clicked)
   .on("mouseover", hovered)
   .on("mouseoff", unhovered);

  g.append("path")
   .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
   .attr("id", "state-borders")
   .attr("d", path);
});

function clicked(d) {
  if(text)
    unhovered();
  var x, y, k;
  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
    // if (!text){
    //   text = svg.append("text")
    //
    // }
    // text.html(states[d.id])
    //     .attr("x", x - states[d.id].length * 3)
    //     .attr("y", y - 15);
  } else {
    // if (text){
    //   text.remove();
    //   text = null;
    // }
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

  // if (text)
  //   text.transition()
  //       .duration(750)
  //       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
  //       .style("stroke-width", 1.5 / k + "px");
}

var hovered = function(d){
  if (text)
    unhovered();
  var x, y;
  var centroid = path.centroid(d);
  x = centroid[0];
  y = centroid[1];
  text = svg.append("text")
  text.html(states[d.id])
      .attr("x", x - states[d.id].length * 10)
      .attr("y", y);

};

var unhovered = function(d){
  text.remove();
  text = null;
};


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
