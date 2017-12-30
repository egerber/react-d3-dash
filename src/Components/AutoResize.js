import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'


//Wrapper component for canvas/svg elements
//dynamically keeps track of the size of the surrounding container 
//and updates the children elements by passing them the current width and height attributes
export default class AutoResize extends React.Component{

	constructor(props){
		super(props);
	}

	createElement(child,width,height){
		
		var dataset=this.props.dataset;
		return React.cloneElement(child, {width, height});
	}

	render(){
		/*<div style={{ display: 'flex', flex: '1', height:"100%"}}> 
 				<div style={{ flex: '1', height:'100%' }}>
*/
		var child=React.Children.only(this.props.children);
		return (
				<AutoSizer>
					{	
							({height, width}) => (this.createElement(child, width,height))
					}
				</AutoSizer>	
		)
	}


}