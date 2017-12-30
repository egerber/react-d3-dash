import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import d3Chart from './d3Chart'
import './PieChart.css';

export default class PieChart extends d3Chart{

	//data is an array of objects {t: "", value: ""}
	renderd3(svg,dataset,selector,width,height,padding){
		var data=dataset.data;
		var selected_data=data.filter(selector)

		svg
		.attr("width",width)
		.attr("height", height);
		
		var g=svg.select("g");
		if(g.empty()){
			g=svg.append("g");
		}
		
		g
		.attr("width","100%")
		.attr("height", "100%");

		width=width-padding*2;
		height=height-padding*2;
		var radius=Math.min(width,height)/2;

		var color = d3.scaleLinear()
				.domain(d3.extent(data, (d) => d.value)) //important, define scale based on all available data items
				.range(['steelblue','red']);

		var path=d3.arc()
				.innerRadius(radius/5)
				.outerRadius(radius);
		
		var pie=d3.pie()
				.padAngle(0.02)
				.value( (d) => d.value);

		var update=g
			.attr("transform", "translate(" + (width/2+padding) + "," + (height/2+padding) + ")")
			.selectAll('.arc')
			.data(pie(selected_data))

		update.exit()
			.remove();

		update
			.enter()
			.append("path")
				.classed('arc',true)
			.merge(update)
				.attr('stroke','black')
				.attr('stroke-width',"2")
				.attr("fill", (d,i) => color(d.value))
				.attr("d", path);
	}

	static accepts(type){
		if(type=="Array"){
			return true;
		}else{
			return false;
		}
	}


}
