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
]

svg_width = 500;
svg_height = 500;

function getMidAngle(d) {
return (d.endAngle + d.startAngle) / 2;
}

var pieData=d3.pie().value(function(d){
    return d.value;
})(dataset);

var scale=d3.scaleOrdinal().domain(dataset).range(d3.schemePaired);

var min = d3.min(dataset);
var max = d3.max(dataset);

var arc=d3.arc().innerRadius(0).outerRadius(100);
var bigArc=d3.arc().innerRadius(0).outerRadius(120);//放大效果

var g=d3.select('.piechart')
        .attr('width',svg_width)
        .attr('height',svg_height)
        .append('g')
        .attr('transform','translate(200,200)');

g.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d',function(d,i){
        return arc(d);
    })
    .attr('fill',function(d,i){
        return scale(i);
    })
    .on('mouseenter',function(d,i){
        var endPos=[];//记录线条最外侧
        var smallArcMiddle=arc.centroid(d);
        var x1=smallArcMiddle[0]*2*1.2,
            y1=smallArcMiddle[1]*2*1.2;
        var middleAngle=getMidAngle(d);
        var x2=x1*1.2,
            y2=y1*1.2;
        endPos[i]=[x2,y2];//保存位置信息
        var middleAngle=getMidAngle(d);
        var x=endPos[i][0]+(middleAngle>Math.PI?-5:5),
            y=endPos[i][1];
        var middleAngle=getMidAngle(d);
        

        d3.select(this)
            .transition()
            .duration(200)
            .attr('d',bigArc(d))


        g.append('g')
            .attr('class','line')
            .selectAll('polyline')
            .data(pieData)
            .enter()
            .append('polyline')
            .attr('points',`${x1},${y1} ${x2},${y2}`)
            .attr('fill','none')
            .attr('stroke', '#333');
        
        g.append('g')
            .attr('class','text')
            .selectAll('text')
            .data(pieData)
            .enter()
            .append('text')
            .text(d.data.name)
            .attr('transform', `translate(${x},${y})`)
            .attr('text-anchor',middleAngle>Math.PI?'end':'start')
    })
    .on('mouseleave',function(d,i){
        d3.select(this)
            .transition()
            .duration(200)
            .attr('d',arc(d))
        var lines = d3.selectAll(".line");
        var texts = d3.selectAll(".text");
        lines.remove();
        texts.remove();
});



console.log(pieData);