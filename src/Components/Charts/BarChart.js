import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import d3Chart from './d3Chart';
import './BarChart.css';

export default class BarChart extends d3Chart{

	renderd3(svg,dataset,selector,width,height,padding){
		
		
		var data=dataset.data;
		var selected_data=data.filter(selector);
		
		svg
		.attr("width",width)
		.attr("height", height);
		
		var g=svg.select("g");
		if(g.empty()){
			g=svg.append("g");
		}
		
		width=width-padding*2;
		height=height-padding*2;

   		var x = d3.scaleBand()
   			.domain(selected_data.map( (d,i) => i))
		    .range([0, width])
		    .paddingInner(0.05)

    	var y=d3.scaleLinear()
    		.domain([0, d3.max(data, (d) => d.value)])
    		.range([height,0]);

    	//initAxis call
    	var update=g
    		.attr("transform", "translate(" + padding + "," + padding + ")")
    		.selectAll('.bar')
    		.data(selected_data);
		
		//Exit
		update.exit()
			.remove();

		//Enter
		var updateE=update.enter().append("rect") //add rectangle without transition
			.classed("bar",true)

		//Update
		update.merge(updateE)
		  .attr("width", x.bandwidth())
		  .attr("x", (d,i) => x(i) )
		  .attr("height", (d) => (height - y(d.value)))
	      .attr("y", (d) => y(d.value) );

	    //add x-axis
	    g.selectAll(".axis-x").remove();
	    g.append("g")
	      .classed("axis-x",true)
	      .attr("transform", "translate(0," + height + ")")
	      .call(d3.axisBottom(x)
	      	.ticks(this.props.xTicks)); //snumber of ticks to be shown

	   	//add y-axis
	   	g.selectAll(".axis-y").remove();
	    g.append("g")
	      .classed("axis-y",true)
	      .call(
	      	d3.axisLeft(y)
	      	.ticks(this.props.yTicks)); //number of ticks to be shown

	}

	static accepts(type){
		if(type=="Array"){
			return true;
		}else{
			return false;
		}
	}




}
