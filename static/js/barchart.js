//Width and height
var w = 300;
var h = 300;

var dataset = [5431,158930,1966,36,1507,652,21,7938,5897,5796,5499,231073,10293,11];

var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .rangeRound([0, w])
                .paddingInner(0.05);

// var yScale = d3.scaleLinear()
//                 .domain([0, d3.max(dataset)])
//                 .range([0, h]);

var yScale = d3.scaleBand()
                .domain(dataset)
                .range([0, h]);

var scale=d3.scaleOrdinal().domain(dataset).range(d3.schemePaired);

//Create SVG element
var svg = d3.select(".barchart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//Create bars
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
           return xScale(i);
   })
   .attr("y", function(d) {
           return h - yScale(d);
   })
   .attr("width", xScale.bandwidth())
   .attr("height", function(d) {
           return yScale(d);
   })
   .attr("fill", function(d,i) {
        return scale(i);
   })
   .on("mouseover", function(d) {

        //Get this bar's x/y values, then augment for the tooltip
        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

        //Update the tooltip position and value
        d3.select("#tooltip")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")						
            .select("#value")
            .text(d);
   
        //Show the tooltip
        d3.select("#tooltip").classed("hidden", false);

   })
   .on("mouseout", function() {
   
        //Hide the tooltip
        d3.select("#tooltip").classed("hidden", true);
        
   })
   .on("click", function() {
           sortBars();
   });

//Define sort order flag
var sortOrder = false;

//Define sort function
var sortBars = function() {

    //Flip value of sortOrder
       sortOrder = !sortOrder;

    svg.selectAll("rect")
       .sort(function(a, b) {
               if (sortOrder) {
                   return d3.ascending(a, b);
               } else {
                   return d3.descending(a, b);
               }
           })
       .transition()
       .delay(function(d, i) {
           return i * 50;
       })
       .duration(1000)
       .attr("x", function(d, i) {
               return xScale(i);
       });

};			