import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import './LineChart.css';
import d3Chart from './d3Chart';

export default class LineChart extends d3Chart{

	renderd3(svg,dataset,selector,width,height,padding){
		var data=dataset.data;
		//group by id in order to draw lines for each index
		var selected_data=Object.values(_.groupBy(data, 'id'));
		
		svg
		.attr("width",width)
		.attr("height", height);

		var g=svg.select("g");
		if(g.empty()){
			g=svg.append("g");
		}

		width=width-padding*2;
		height=height-padding*2;

		var x = d3.scaleLinear()
    		.range([0, width])
    		.domain(d3.extent(_.flatten(data), (d) => d.t))

		var y = d3.scaleLinear()
			.domain(d3.extent(_.flatten(data), (d) => d.value))
    		.range([height, 0]);

		var line = d3.line()
			.curve(d3.curveBasis)		    	
			.x( (d) => x(d.t))
	    	.y( (d) => y(d.value))


	    var color =d3.scaleOrdinal()
			.domain([0,selected_data.length])
			.range(d3.schemeCategory20);


		const lines = g
			.attr("transform", "translate(" + padding + "," + padding + ")")
			.selectAll('.line')
			.data(selected_data);

        // Exit
        lines.exit()
        	.remove()
        
        // Enter
        const linesEnter = lines.enter().append("g").append("path")
        	.classed("line",true)
        					
        //Update
        linesEnter.merge(lines)
        	.attr("d", (d) => line(d))
            .attr("stroke", (d,i) => color(i))
            .attr("fill","none")
            .attr("stroke-width","2");
        
        //add x-axis
	    g.selectAll(".axis-x").remove();
	    g.append("g")
	      .classed("axis-x",true)
	      .attr("transform", "translate(0," + height + ")")
	      .call(d3.axisBottom(x)
	      	.ticks(this.props.xTicks));

	   	//add y-axis
	   	g.selectAll(".axis-y").remove();
	    g.append("g")
	      .classed("axis-y",true)
	      .call(d3.axisLeft(y)
	      	.ticks(this.props.yTicks));
        
	}

	static accepts(type){
		if(type=="Array"){
			return true;
		}else{
			return false;
		}
	}


} 
