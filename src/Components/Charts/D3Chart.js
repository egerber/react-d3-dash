import React from 'react';
import * as d3 from 'd3';

import './D3Chart.css';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'

//Boilerplate class for React component that uses d3
class D3Chart extends React.Component{

	static defaultProps={
		width:400,
		height:400,
		padding:20,
		xTicks:5, //number of ticks to be displayed on the x-Axis
		yTicks:5,
		dataset:{name: "",data:[]}, //empty dataset
		selector: function(data_item) {return false} //display no items
	}

	constructor(props){
		super(props);
		this.state={
			svg:null
		};

	}

	//this method is overriden by every child class
	//all the code of d3 is found here
	renderD3(svg,dataset,selector,width,height,padding){
		//nothing happens in the base class
	}

	//disable React's rendering and using only d3
	shouldComponentUpdate(nextProps,nextState) {
		if(nextState.svg!=null){
			if(nextProps.selector!=this.props.selector || nextProps.dataset!=this.props.dataset || nextProps.width!=this.props.width || nextProps.height!=this.props.height){
				this.renderd3(nextState.svg,nextProps.dataset,nextProps.selector,nextProps.width,nextProps.height,nextProps.padding);
			}
		}

		//disable React's rendering and using only d3
		return false;
	}


	//the initial call for rendering the d3 graph is done here
	init(){
		
		this.renderD3(this.state.svg,this.props.dataset,this.props.selector,this.props.width,this.props.height,this.props.padding);
	}


	render(){
		return (
			<svg ref={ (ref) => this.setState({svg:d3.select(ref)}, () => this.init())} className="svgChart"></svg>
			);

		return (
			<AutoSizer>
					{	
							({height, width}) => (
								<div>
									<svg width={width} height={height} ref={ (ref) => this.setState({svg:d3.select(ref)}, () => this.init())} className="svgChart"></svg>
								</div>
							)
					}
			</AutoSizer>)
	}

	//gets overwritten by child class
	//returns true if the chart can visualize a dataset of the given type, false if not
	static accepts(type){
		return false; //d3Chart is only the base type for all charts and cannot visualize anything
	}

}

export default D3Chart;