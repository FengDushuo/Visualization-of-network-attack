//Width and height
var w = 300;
var h = 300;

//var dataset = [5431,158930,1966,36,1507,652,21,7938,5897,5796,5499,231073,10293,11];

var dataset=[
    {name: 'DDoS', value: 5431},
    {name: 'PortScan', value: 158930},
    {name: 'Bot', value: 1966},
    {name: 'Infiltration', value: 36},
    {name: 'Web Attack Brute Force', value: 1507},
    {name: 'Web Attack XSS', value: 652},
    {name: 'Web Attack Sql Injection', value: 21},
    {name: 'FTP-Patator', value: 7938},
    {name: 'SSH-Patator', value: 5897},
    {name: 'DoS slowloris', value: 5796},
    {name: 'DoS Slowhttptest', value: 5499},
    {name: 'DoS Hulk', value: 231073},
    {name: 'DoS GoldenEye', value: 10293},
    {name: 'Heartbleed', value: 11}
];


var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .rangeRound([0, w])
                .paddingInner(0.05);

var yScale = d3.scaleSqrt()
                .domain([0, d3.max(dataset,function(d){return d.value;})])
                .range([0, h-20]);

// var yScale = d3.scaleBand()
//                 .domain(dataset)
//                 .range([0, h]);

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
           return h - yScale(d.value);
   })
   .attr("width", xScale.bandwidth())
   .attr("height", function(d) {
           return yScale(d.value);
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
            .text(d.value);

        d3.select("#tooltip")
            .select("#typename")
            .text(d.name);
   
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