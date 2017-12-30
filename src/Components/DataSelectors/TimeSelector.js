import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import './TimeSelector.css';
import DataSelector from './DataSelector'; //base class


//Selector 
export default class TimeSelector extends DataSelector{

	constructor(props){
		super(props);

		var t=this.min_key();
		this.state={
			selector: function(data_item){return data_item.t==t}
		}
	}

	//helper function to find smalles item
	min_key(){
		return _.min(this.props.dataset.data.map((d) => d.t));
	}

	max_key(){
		return _.max(this.props.dataset.data.map((d) => d.t));
	}

	//TODO only allow valid time states
	sliderHandler(e){
		var t=e.target.value;
		this.setState({selector: function(data_item){ return data_item.t == t}});
	}

	mouseDownHandler(e){
		e.stopPropagation(); //stops the grid from triggering the dragging event
	}

	render(){


		return (
			<div className="timeSelector">
				<div style={{width:"100%",height:"100%"}}>
					{React.Children.map(this.props.children, (child) => this.createElement(child))}
				</div>
				<div className="rangeSlider">
					<span>{this.min_key()}</span>
					<input onMouseDown={(e) => this.mouseDownHandler(e)} onChange={ (e) => this.sliderHandler(e)}
				        		type="range" 
				        		defaultValue={this.min_key()}
				        		min={this.min_key()}
				        		max={this.max_key()}/>
				    <span>{this.max_key()}</span>
				</div>
			</div>)
	}


}

