import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import './BarChart.css';

export default class HierarchicalBarChart extends React.Component{

	constructor(props){
		super(props);

	}

	/*takes data in the format: nodes:{id: , type: ,}, edges:{from: , to:, }
	//algorithm sorts them out by layer e.g. layer0: [], layer1: [], layer2:[], etc.
	//draw nodes from layer0 first, nodes from layer2 second, etc.
	

}