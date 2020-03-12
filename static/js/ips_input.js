    var index = 0;
    var width = 840,
        height = 800;

    var filename = "/"+document.getElementById("jsonpath").value;
    
    d3.json(filename,function(error,json){
      if(error) throw error;
      
      var links = json.links;
      
      //关系分组
      var linkGroup = {};
      //对连接线进行统计和分组，不区分连接线的方向，只要属于同两个实体，即认为是同一组
      var linkmap = {}
      for(var i=0; i<links.length; i++){
        var key = links[i].source<links[i].target?links[i].source+':'+links[i].target:links[i].target+':'+links[i].source;
        if(!linkmap.hasOwnProperty(key)){
          linkmap[key] = 0;
        }
        linkmap[key]+=1;
        if(!linkGroup.hasOwnProperty(key)){
          linkGroup[key]=[];
        }
        linkGroup[key].push(links[i]);
      }
      //为每一条连接线分配size属性，同时对每一组连接线进行编号
      for(var i=0; i<links.length; i++){
        var key = links[i].source<links[i].target?links[i].source+':'+links[i].target:links[i].target+':'+links[i].source;
        links[i].size = linkmap[key];
        //同一组的关系进行编号
        var group = linkGroup[key];
        var keyPair = key.split(':');
        var type = 'noself';//标示该组关系是指向两个不同实体还是同一个实体
        if(keyPair[0]==keyPair[1]){
          type = 'self';
        }
        //给节点分配编号
        setLinkNumber(group,type);
      }
      console.log(links);
     
      var nodes = {};
     
      // Compute the distinct nodes from the links.
      links.forEach(function(link) {
        link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
        link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
      });
     
      var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(300)
        .charge(-300)
        .on("tick", tick)
        .start();

      var drag = force.drag()
        .on("dragstart", dragstart);
     
      var svg = d3.select(".ipshowleft").append("svg:svg")
        .attr("width", width)
        .attr("height", height);
     
      // Per-type markers, as they don't inherit styles.
      svg.append("svg:defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
        .enter().append("svg:marker")
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 30)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");
     
      var path = svg.append("svg:g").selectAll("path")
        .data(force.links())
        .enter().append("svg:path")
        .attr("class", function(d) { return "link " + d.type; })
        .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });
     
      var circle = svg.append("svg:g")
        .selectAll("circle")
        .data(force.nodes())
        .enter().append("svg:circle")
        .attr("r", 20)
        .on("dblclick", dblclick)
        .call(force.drag);
     
      var text = svg.append("svg:g").selectAll("g")
        .data(force.nodes())
        .enter().append("svg:g");
     
      // A copy of the text with a thick white stroke for legibility.
      text.append("svg:text")
        .attr("x", 8)
        .attr("y", ".31em")
        .attr("class", "shadow")
        .text(function(d) { return d.name; });
     
      text.append("svg:text")
        .attr("x", 8)
        .attr("y", ".31em")
        .text(function(d) { return d.name; });

      function dblclick(d) {
        d3.select(this).classed("fixed", d.fixed = false);
      }

      function dragstart(d) {
        d3.select(this).classed("fixed", d.fixed = true);
      }
        
        
      // Use elliptical arc path segments to doubly-encode directionality.
      function tick() {
        path.attr("d", function(d) {
        //如果连接线连接的是同一个实体，则对path属性进行调整，绘制的圆弧属于长圆弧，同时对终点坐标进行微调，避免因坐标一致导致弧无法绘制
        if(d.target==d.source){
          dr = 30/d.linknum;
          return"M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 1,1 " + d.target.x + "," + (d.target.y+1);
        }else if(d.size%2!=0 && d.linknum==1){//如果两个节点之间的连接线数量为奇数条，则设置编号为1的连接线为直线，其他连接线会均分在两边
          return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
        }
        //根据连接线编号值来动态确定该条椭圆弧线的长半轴和短半轴，当两者一致时绘制的是圆弧
        //注意A属性后面的参数，前两个为长半轴和短半轴，第三个默认为0，第四个表示弧度大于180度则为1，小于则为0，这在绘制连接到相同节点的连接线时用到；第五个参数，0表示正角，1表示负角，即用来控制弧形凹凸的方向。本文正是结合编号的正负情况来控制该条连接线的凹凸方向，从而达到连接线对称的效果
        var curve=1.5;
        var homogeneous=1.2;
        var dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx*dx+dy*dy)*(d.linknum+homogeneous)/(curve*homogeneous);
        //当节点编号为负数时，对弧形进行反向凹凸，达到对称效果
        if(d.linknum<0){
          dr = Math.sqrt(dx*dx+dy*dy)*(-1*d.linknum+homogeneous)/(curve*homogeneous);
          return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,0 " + d.target.x + "," + d.target.y;
        }
        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        });
     
        circle.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
        });
     
        text.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
        });
      }
     
      function setLinkNumber(group,type){
        if(group.length==0) return;
        //对该分组内的关系按照方向进行分类，此处根据连接的实体ASCII值大小分成两部分
        var linksA = [], linksB = [];
        for(var i = 0;i<group.length;i++){
          var link = group[i];
          if(link.source < link.target){
            linksA.push(link);
          }else{
            linksB.push(link);
          }
        }
        //确定关系最大编号。为了使得连接两个实体的关系曲线呈现对称，根据关系数量奇偶性进行平分。
        //特殊情况：当关系都是连接到同一个实体时，不平分
        var maxLinkNumber = 0;
        if(type=='self'){
          maxLinkNumber = group.length;
        }else{
          maxLinkNumber = group.length%2==0?group.length/2:(group.length+1)/2;
        }
        //如果两个方向的关系数量一样多，直接分别设置编号即可
        if(linksA.length==linksB.length){
          var startLinkNumber = 1;
          for(var i=0;i<linksA.length;i++){
            linksA[i].linknum = startLinkNumber++;
          }
          startLinkNumber = 1;
          for(var i=0;i<linksB.length;i++){
            linksB[i].linknum = startLinkNumber++;
          }
        }else{//当两个方向的关系数量不对等时，先对数量少的那组关系从最大编号值进行逆序编号，然后在对另一组数量多的关系从编号1一直编号到最大编号，再对剩余关系进行负编号
          //如果抛开负号，可以发现，最终所有关系的编号序列一定是对称的（对称是为了保证后续绘图时曲线的弯曲程度也是对称的）
          var biggerLinks,smallerLinks;
          if(linksA.length>linksB.length){
            biggerLinks = linksA;
            smallerLinks = linksB;
          }else{
            biggerLinks = linksB;
            smallerLinks = linksA;
          }
     
          var startLinkNumber = maxLinkNumber;
          for(var i=0;i<smallerLinks.length;i++){
            smallerLinks[i].linknum = startLinkNumber--;
          }
          var tmpNumber = startLinkNumber;
     
          startLinkNumber = 1;
          var p = 0;
          while(startLinkNumber<=maxLinkNumber){
            biggerLinks[p++].linknum = startLinkNumber++;
          }
          //开始负编号
          startLinkNumber = 0-tmpNumber;
          for(var i=p;i<biggerLinks.length;i++){
            biggerLinks[i].linknum = startLinkNumber++;
          }
        } 
      }

    });