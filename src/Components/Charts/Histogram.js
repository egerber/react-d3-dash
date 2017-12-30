import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import d3Chart from './d3Chart';
import './Histogram.css';

export default class Histogram extends d3Chart{

	static defaultProps={
		bins:10,
	}

	renderd3(svg,dataset,t,width,height,padding){

	}
}
