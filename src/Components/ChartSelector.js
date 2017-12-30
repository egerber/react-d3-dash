import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

import AutoResize from './AutoResize';
import TimeSelector from './DataSelectors/TimeSelector';
import './ChartSelector.css';
import chartTypes from './Charts/ChartTypes'

export default class ChartSelector extends React.Component{

	static defaultProps={
		dataset:{},
	}

	constructor(props){
		super(props);

		var valid_types=this.validChartTypes(this.props.dataset);
		
		var chartElement=null;
		if(valid_types.length>0)
			chartElement=this.createChart(chartTypes.get(valid_types[0]))

		this.state={chartElement};
	}

	//returns an array of appropriate Charttypes given a certain dataset
	validChartTypes(dataset){
		var arr_charttypes=[];
		for(var [chart_name,chart_type] of chartTypes.entries()){
			if (chart_type.accepts(dataset.type)){
				arr_charttypes.push(chart_name);
			}
		}
		return arr_charttypes;
	}

	createChart(chartType){
		var chart=React.createElement(chartType);
		return (
				<TimeSelector dataset={this.props.dataset}>	
						{chart}
				</TimeSelector>
			);
	}

	handleChange(event){
		var chartType=chartTypes.get(event.target.value);
		this.setState({
			chartElement: this.createChart(chartType)
		});
	}

	render(){
		{this.state.chartElement}
		var options=this.validChartTypes(this.props.dataset).map( (chartType,i) => <option key={i}>{chartType}</option>);
		return (
			<div className="chartSelector">
				<div className="chartSelectorHeader">
					<div className="chartName">
						{this.props.dataset.name}
					</div>
					<select onChange={(event)=> this.handleChange(event)}>
						{options}
					</select>
				</div>
				<div className="chartSelectorBody"> 
					{this.state.chartElement}

				</div>
			</div>
		);

	}


}