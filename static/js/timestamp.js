
var file_filed = "Monday-WorkingHours";

var filename = "/static/everyday/"+file_filed+"/TimestampFlowDuration.csv";

var svg = d3.select("svg"),
	margin = {top: 50, right: 50, bottom: 300, left: 80},
	width = +svg.attr("width") - margin.left - margin.right,
	height = +svg.attr("height") - margin.top - margin.bottom;
var g = svg.append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		   
var parseTime = d3.timeParse("%d/%m/%Y %I:%M:%S");

var x = d3.scaleTime()
          .rangeRound([0, width]);
var y = d3.scaleLinear()
          .rangeRound([height, 0]);
var brushy = d3.scaleLinear()//刷子与线图公用一个横轴比例尺，但是刷子有单独的纵轴比例尺
			   .rangeRound([height-margin.bottom-margin.top-20,0]);

var line = d3.line()
             .x(function(d) { return x(d.date); })
             .y(function(d) { return y(d.value); });
var brushline=d3.line()
                .x(function(d) { return x(d.date); })
				.y(function(d) { return brushy(d.value); });
				
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

var xbrushAxis = d3.axisTop(x);
var ybrushAxis = d3.axisLeft(brushy);

g.append("clipPath")
	.attr("id", "clip")
	.append("rect")
	.attr("width", width)
	.attr("height", height);


d3.csv(filename, function(d) {
        d.date = parseTime(d.date);
        d.value = +d.value;
        return d;
}, function(error, data) {
        if (error) throw error;
        x.domain(d3.extent(data, function(d) { return d.date; }));
	    y.domain(d3.extent(data, function(d) { return d.value; }));
	    brushy.domain(d3.extent(data, function(d) { return d.value; }));
		
		var updateLine = g.append("g")
                .attr("class","chart")
                .datum(data);//绑定数据

		var path=updateLine.append("path")
						.attr("clip-path", "url(#clip)")//这里用来防止图形越界
						.attr("class","line")
						.attr("fill", "none")
						.attr("stroke", "steelblue")
						.attr("stroke-width", 0.5)
						.attr("d", line);
						
		var xGrooup = g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

		var yGrooup = g.append("g")
						.call(yAxis)
						.append("text")
						.attr("fill", "#000")
						.attr("transform", "rotate(-90)")
						.attr("y", 6)
						.attr("dy", "0.71em")
						.attr("text-anchor", "end")
						.text("data");
		//定义一个透明正方形用来更好的进行缩放，缩放功能在这里实现，如果不定义这个方块也是可以的
		//但是缩放操作起来变得很困难
		var zoom = d3.zoom()
						.scaleExtent([1.11, 100])//缩放比例范围
						.translateExtent([[0,0], [width, height]])
						.on("zoom", zoomed);//每次缩放调用zoomed函数
		
		var zoomRect = svg.append("rect")
						.attr("width",width+80)
						.attr("height",height+50)
						.attr("fill","none")
						.attr("pointer-events","all")
						.call(zoom);

						
		var brush = d3.brushX()
                .extent([[0, 0], [width, 80]])
                .on("brush end", brushed);//操作刷子的时候调用brushed函数，在下面定义

		var brushBox = svg.append("g")
						.attr("transform","translate("+margin.left+","+(height+margin.top*2)+")")
						.attr("class", "brushBox");

		brushBox.append("path")
						.attr("fill", "none")
						.attr("stroke", "red")
						.attr("stroke-width", 0.2)
						.attr("d", brushline(data));

		brushBox.append("g")
						.attr("class", "brush")
						.attr("fill", 'red')
						.call(brush)
						.call(brush.move, x.range())
						.selectAll("rect")
						.attr("width", width)
						.attr("height", 80);

		brushBox.append("g")
						.attr("transform", "translate(0,0)")
						.call(xbrushAxis);

		brushBox.append("g")
						.call(ybrushAxis)
						.append("text")
						.attr("fill", "#000")
						.attr("transform", "rotate(-90)")
						.attr("y", 6)
						.attr("dy", "0.71em")
						.attr("text-anchor", "end")
						.text("data");
						
		function brushed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") {
                return;
            }
            var s = d3.event.selection || x.range();
            
            //匹配折线图显示范围
			
            zoomRect.call(zoom.transform, d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0));
        }
		
		function zoomed(){

            //定义缩放方向
            let t = d3.event.transform.rescaleX(x);

            //缩放坐标轴
            xGrooup.call(xAxis.scale(t));

            //缩放折线
            g.select("path.line")
                    .attr("d", line.x(function(d){
                        return t(d.date)
                    }));

            //缩放刷子
            brushBox.select(".brush")
                    .call(brush.move,x.range().map(d3.event.transform.invertX,d3.event.transform))
        }
})

function changefileName(id){
	file_filed = id;
	document.getElementById("daytitle").innerHTML=file_filed;
	if(file_filed == "Monday-WorkingHours"){
		window.location.href="/timestampother";
		
	}
	var filename = "/static/everyday/"+file_filed+"/TimestampFlowDuration.csv";

	var svg = d3.select("svg"),
		margin = {top: 50, right: 50, bottom: 300, left: 80},
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom;

	svg.selectAll("g").remove();
	
	var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
	var parseTime = d3.timeParse("%d/%m/%Y %I:%M");

	var x = d3.scaleTime()
			.rangeRound([0, width]);
	var y = d3.scaleLinear()
			.rangeRound([height, 0]);
	var brushy = d3.scaleLinear()//刷子与线图公用一个横轴比例尺，但是刷子有单独的纵轴比例尺
				.rangeRound([height-margin.bottom-margin.top-20,0]);

	var line = d3.line()
				.x(function(d) { return x(d.date); })
				.y(function(d) { return y(d.value); });
	var brushline=d3.line()
					.x(function(d) { return x(d.date); })
					.y(function(d) { return brushy(d.value); });
					
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	var xbrushAxis = d3.axisTop(x);
	var ybrushAxis = d3.axisLeft(brushy);

	g.append("clipPath")
		.attr("id", "clip")
		.append("rect")
		.attr("width", width)
		.attr("height", height);


	d3.csv(filename, function(d) {
			d.date = parseTime(d.date);
			d.value = +d.value;
			return d;
	}, function(error, data) {
			if (error) throw error;
			x.domain(d3.extent(data, function(d) { return d.date; }));
			y.domain(d3.extent(data, function(d) { return d.value; }));
			brushy.domain(d3.extent(data, function(d) { return d.value; }));
			
			var updateLine = g.append("g")
					.attr("class","chart")
					.datum(data);//绑定数据

			var path=updateLine.append("path")
							.attr("clip-path", "url(#clip)")//这里用来防止图形越界
							.attr("class","line")
							.attr("fill", "none")
							.attr("stroke", "steelblue")
							.attr("stroke-width", 0.5)
							.attr("d", line);
							
			var xGrooup = g.append("g")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis);

			var yGrooup = g.append("g")
							.call(yAxis)
							.append("text")
							.attr("fill", "#000")
							.attr("transform", "rotate(-90)")
							.attr("y", 6)
							.attr("dy", "0.71em")
							.attr("text-anchor", "end")
							.text("data");
			//定义一个透明正方形用来更好的进行缩放，缩放功能在这里实现，如果不定义这个方块也是可以的
			//但是缩放操作起来变得很困难
			var zoom = d3.zoom()
							.scaleExtent([1.11, 100])//缩放比例范围
							.translateExtent([[0,0], [width, height]])
							.on("zoom", zoomed);//每次缩放调用zoomed函数
			
			var zoomRect = svg.append("rect")
							.attr("width",width+50)
							.attr("height",height+50)
							.attr("fill","none")
							.attr("pointer-events","all")
							.call(zoom);

							
			var brush = d3.brushX()
					.extent([[0, 0], [width, 80]])
					.on("brush end", brushed);//操作刷子的时候调用brushed函数，在下面定义

			var brushBox = svg.append("g")
							.attr("transform","translate("+margin.left+","+(height+margin.top*2)+")")
							.attr("class", "brushBox");

			brushBox.append("path")
							.attr("fill", "none")
							.attr("stroke", "red")
							.attr("stroke-width", 0.2)
							.attr("d", brushline(data));

			brushBox.append("g")
							.attr("class", "brush")
							.attr("fill", 'red')
							.call(brush)
							.call(brush.move, x.range())
							.selectAll("rect")
							.attr("width", width)
							.attr("height", 80);

			brushBox.append("g")
							.attr("transform", "translate(0,0)")
							.call(xbrushAxis);

			brushBox.append("g")
							.call(ybrushAxis)
							.append("text")
							.attr("fill", "#000")
							.attr("transform", "rotate(-90)")
							.attr("y", 6)
							.attr("dy", "0.71em")
							.attr("text-anchor", "end")
							.text("data");
							
			function brushed() {
				if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") {
					return;
				}
				var s = d3.event.selection || x.range();
				
				//匹配折线图显示范围
				
				zoomRect.call(zoom.transform, d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0));
			}
			
			function zoomed(){

				//定义缩放方向
				let t = d3.event.transform.rescaleX(x);

				//缩放坐标轴
				xGrooup.call(xAxis.scale(t));

				//缩放折线
				g.select("path.line")
						.attr("d", line.x(function(d){
							return t(d.date)
						}));

				//缩放刷子
				brushBox.select(".brush")
						.call(brush.move,x.range().map(d3.event.transform.invertX,d3.event.transform))
			}
	})
}