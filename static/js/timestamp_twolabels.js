var main_margin = {top: 20, right: 80, bottom: 100, left: 40},
    mini_margin = {top: 430, right: 80, bottom: 20, left: 40},
    main_width = 960 - main_margin.left - main_margin.right,
    main_height = 500 - main_margin.top - main_margin.bottom,
    mini_height = 500 - mini_margin.top - mini_margin.bottom;

var formatDate = d3.time.format("%d/%m/%Y %I:%M:%S"),
    parseDate = formatDate.parse,
    bisectDate = d3.bisector(function(d) { return d.timestamp; }).left,
    formatOutput0 = function(d) { return formatDate(d.timestamp) + " - " + d.label1; },
    formatOutput1 = function(d) { return formatDate(d.timestamp) + " - " + d.label2; };

var main_x = d3.time.scale()
    .range([0, main_width]),
    mini_x = d3.time.scale()
    .range([0, main_width]);

var main_y0 = d3.scale.sqrt()
    .range([main_height, 0]),
    main_y1 = d3.scale.sqrt()
    .range([main_height, 0]),
    mini_y0 = d3.scale.sqrt()
    .range([mini_height, 0]),
    mini_y1 = d3.scale.sqrt()
    .range([mini_height, 0]);

var main_xAxis = d3.svg.axis()
    .scale(main_x)
    .tickFormat(d3.time.format("%I:%M:%S"))
    .orient("bottom"),
    mini_xAxis = d3.svg.axis()
    .scale(mini_x)
    .tickFormat(d3.time.format("%I:%M:%S"))
    .orient("bottom");

var main_yAxisLeft = d3.svg.axis()
    .scale(main_y0)
    .orient("left");
    main_yAxisRight = d3.svg.axis()
    .scale(main_y1)
    .orient("right");

var brush = d3.svg.brush()
    .x(mini_x)
    .on("brush", brush);

var main_line0 = d3.svg.line()
    .interpolate("cardinal")
    .x(function(d) { return main_x(d.timestamp); })
    .y(function(d) { return main_y0(d.label1); });

var main_line1 = d3.svg.line()
    .interpolate("cardinal")
    .x(function(d) { return main_x(d.timestamp); })
    .y(function(d) { return main_y1(d.label2); });

var mini_line0 = d3.svg.line()
    .x(function(d) { return mini_x(d.timestamp); })
    .y(function(d) { return mini_y0(d.label1); });

var mini_line1 = d3.svg.line()
    .x(function(d) { return mini_x(d.timestamp); })
    .y(function(d) { return mini_y1(d.label2); });

var svg = d3.select(".input_filed").append("svg")
    .attr("width", main_width + main_margin.left + main_margin.right)
    .attr("height", main_height + main_margin.top + main_margin.bottom);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", main_width)
    .attr("height", main_height);

var main = svg.append("g")
    .attr("transform", "translate(" + main_margin.left + "," + main_margin.top + ")");

var mini = svg.append("g")
    .attr("transform", "translate(" + mini_margin.left + "," + mini_margin.top + ")");

d3.csv("/static/timestamp_twolabels/data.csv", function(error, data) {
  data.forEach(function(d) {
    d.timestamp = parseDate(d.timestamp);
    d.label1 = +d.label1;
    d.label2 = +d.label2;
  });

  data.sort(function(a, b) {
    return a.timestamp - b.timestamp;
  });

  main_x.domain([data[0].timestamp, data[data.length - 1].timestamp]);
  main_y0.domain(d3.extent(data, function(d) { return d.label1; }));
  //main_y0.domain([0.1, d3.max(data, function(d) { return d.label1; })]);
  main_y1.domain(d3.extent(data, function(d) { return d.label2; }));
  mini_x.domain(main_x.domain());
  mini_y0.domain(main_y0.domain());
  mini_y1.domain(main_y1.domain());

  main.append("path")
      .datum(data)
      .attr("clip-path", "url(#clip)")
      .attr("class", "line line0")
      .attr("d", main_line0);

  main.append("path")
      .datum(data)
      .attr("clip-path", "url(#clip)")
      .attr("class", "line line1")
      .attr("d", main_line1);

  main.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + main_height + ")")
      .call(main_xAxis);

  main.append("g")
      .attr("class", "y axis axisLeft")
      .call(main_yAxisLeft)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("label1");

  main.append("g")
      .attr("class", "y axis axisRight")
      .attr("transform", "translate(" + main_width + ", 0)")
      .call(main_yAxisRight)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -12)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("label2");

  mini.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + mini_height + ")")
      .call(main_xAxis);

  mini.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", mini_line0);

  mini.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", mini_line1);

  mini.append("g")
      .attr("class", "x brush")
      .call(brush)
    .selectAll("rect")
      .attr("y", -6)
      .attr("height", mini_height + 7);

  var focus = main.append("g")
      .attr("class", "focus")
      .style("display", "none");

  // label2eige auf der Zeitleiste
  focus.append("line")
      .attr("class", "x")
      .attr("y1", main_y0(0) - 6)
      .attr("y2", main_y0(0) + 6)

  // label2eige auf der linken Leiste
  focus.append("line")
      .attr("class", "y0")
      .attr("x1", main_width - 6) // nach links
      .attr("x2", main_width + 6); // nach rechts

  // label2eige auf der rechten Leiste
  focus.append("line")
      .attr("class", "y1")
      .attr("x1", main_width - 6)
      .attr("x2", main_width + 6);

  focus.append("circle")
      .attr("class", "y0")
      .attr("r", 4);

  focus.append("text")
      .attr("class", "y0")
      .attr("dy", "-1em");

  focus.append("circle")
      .attr("class", "y1")
      .attr("r", 4);

  focus.append("text")
      .attr("class", "y1")
      .attr("dy", "-1em");

  main.append("rect")
      .attr("class", "overlay")
      .attr("width", main_width)
      .attr("height", main_height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

  function mousemove() {
    var x0 = main_x.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.timestamp > d1.timestamp - x0 ? d1 : d0;
    focus.select("circle.y0").attr("transform", "translate(" + main_x(d.timestamp) + "," + main_y0(d.label1) + ")");
    focus.select("text.y0").attr("transform", "translate(" + main_x(d.timestamp) + "," + main_y0(d.label1) + ")").text(formatOutput0(d));
    focus.select("circle.y1").attr("transform", "translate(" + main_x(d.timestamp) + "," + main_y1(d.label2) + ")");
    focus.select("text.y1").attr("transform", "translate(" + main_x(d.timestamp) + "," + main_y1(d.label2) + ")").text(formatOutput1(d));
    focus.select(".x").attr("transform", "translate(" + main_x(d.timestamp) + ",0)");
    focus.select(".y0").attr("transform", "translate(" + main_width * -1 + ", " + main_y0(d.label1) + ")").attr("x2", main_width + main_x(d.timestamp));
    focus.select(".y1").attr("transform", "translate(0, " + main_y1(d.label2) + ")").attr("x1", main_x(d.timestamp));
  }
});

function brush() {
  main_x.domain(brush.empty() ? mini_x.domain() : brush.extent());
  main.select(".line0").attr("d", main_line0);
  main.select(".line1").attr("d", main_line1);
  main.select(".x.axis").call(main_xAxis);
}