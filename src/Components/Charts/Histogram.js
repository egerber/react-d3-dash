import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import D3Chart from './D3Chart';
import './Histogram.css';

export default class Histogram extends D3Chart{

	static defaultProps={
		bins:10,
	}

	renderD3(svg,dataset,t,width,height,padding){

	}
}
