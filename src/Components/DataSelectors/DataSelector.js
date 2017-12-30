import React from 'react';
import AutoResize from '../AutoResize';
//base class for selecting data from 
export default class DataSelector extends React.Component{

	//Wrapper around a chart element
	//given a dataset, selects the data to be displayed, by generating a selector function and passing it to the chart element
	constructor(props){
		super(props);

		this.state={
			selector:function(data_item){return true} //select all items
		}
	}

	createElement(child){
		
		return (
			<AutoResize>
				{React.cloneElement(child, {...this.props, selector:this.state.selector})}
			</AutoResize>
		);
	}

	//overwritten by child element 
	render(){
		return (
			<div>
				{React.Children.map(this.props.children, (child) => this.createElement(child))}
			</div>);
	}
}