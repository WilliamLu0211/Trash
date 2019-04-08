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

var car_accidents = {'45': 1439, '28': 929, '50': 79, '53': 795, '32': 476, '04': 1340, '24': 843, '25': 522, '26': 1570, '27': 577, '06': 5605, '21': 1204, '48': 5502, '23': 207, '46': 140, '47': 1488, '08': 901, '09': 461, '42': 1768, '29': 1322, '40': 968, '41': 678, '05': 778, '02': 110, '56': 158, '10': 183, '33': 175, '13': 2201, '01': 1455, '30': 215, '20': 564, '38': 139, '51': 1058, '39': 1683, '12': 4677, '15': 156, '22': 1103, '17': 1617, '16': 326, '55': 813, '18': 1236, '31': 308, '49': 411, '37': 2052, '36': 1495, '35': 518, '34': 875, '19': 561, '54': 368, '44': 69, 'total': 54118}

var lung_cancer_state = {'56': 50, '54': 110, '37': 80, '22': 76, '45': 82, '36': 70, '53': 62, '42': 84, '02': 47, '25': 75, '23': 101, '27': 63, '20': 69, '21': 110, '04': 59, '49': 22, '46': 69, '47': 90, '08': 44, '09': 74, '28': 86, '29': 89, '40': 81, '41': 68, '05': 95, '24': 63, '44': 86, '01': 82, '26': 80, '12': 84, '06': 44, '13': 65, '10': 89, '39': 85, '38': 67, '15': 57, '48': 50, '17': 73, '16': 56, '19': 78, '32': 61, '31': 67, '30': 72, '51': 65, '50': 83, '35': 47, '34': 67, '55': 72, '18': 83, '33': 82} //NUMBER OF CASES PER 100,000 people

var air_pollution = {'56': 29.0, '54': 5.7, '28': 39.0, '22': 13.9, '50': 4.2, '19': 17.0, '35': 29.0, '23': 60.0, '24': 26.0, '25': 43.0, '26': 51.5, '27': 59.0, '06': 233.0, '21': 28.0, '04': 79.0, '49': 91.0, '46': 130.0, '47': 9.6, '08': 24.0, '45': 31.0, '42': 29.7, '29': 66.0, '40': 43.0, '41': 14.0, '09': 12.0, '05': 6.0, '51': 9.6, '02': 76.0, '01': 25.0, '13': 12.0, '12': 38.0, '20': 40.0, '10': 4.4, '39': 19.2, '38': 32.0, '15': 29.0, '48': 29.4, '17': 17.5, '16': 20.0, '55': 28.0, '32': 74.0, '31': 7.0, '30': 38.0, '37': 22.0, '36': 87.0, '53': 151.0, '34': 25.0, '33': 5.0, '18': 22.0, '44': 3.0} //Measured in  µg/m³


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
   .style('fill', (d, i) => {
                    var pollute = Math.round(Math.floor(256 * air_pollution[d.id] / (233.0 + 1)))
                    console.log(air_pollution[d.id], states[d.id])
                    return rgbToHex(255 - pollute);
                })
   .attr("d", path)
   .on("click", clicked)
   .on("mouseover", hovered)
   .on("mouseoff", unhovered);

  g.append("path")
   .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
   .attr("id", "state-borders")
   .attr("d", path);


});

function rgbToHex(c) {
    if(c == 255){
      c = 250
    }

    var hex = c.toString(16);
    var component = "";
    if(hex.length == 1){
      component = "0" + hex;
    }
    else{
      component = hex;
    }
    return "#" + component + component + component;
}

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

var car_density = function(d){
  // d.attr('fill', function(d) { return color(d); })
}


var cd = document.getElementById("cd");
var lcr = document.getElementById("lcr");

cd.addEventListener('click', function(){
  cd.setAttribute("class", "btn btn-primary");
  lcr.setAttribute("class", "btn btn-secondary");
  car_density();
});

lcr.addEventListener('click', function(){
  lcr.setAttribute("class", "btn btn-primary");
  cd.setAttribute("class", "btn btn-secondary");
});
