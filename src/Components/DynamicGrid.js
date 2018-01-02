import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import './DynamicGrid.css';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class DynamicGrid extends React.PureComponent{

	static defaultProps = {
	    className: "layout",
	    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
	    rowHeight: 200,
	    "count-columns":3,
	    children:[] //should have a key prop
	};
	
	constructor(props){
		
		super(props);

		this.count_columns=props["count-columns"];
		
		this.state = {
		      children: props.children,
		      newCounter: 0
		};
		
		this.onBreakpointChange = this.onBreakpointChange.bind(this);
		this.onLayoutChange = this.onLayoutChange.bind(this);
	}


	createElement(el,index){
		
		var width_element=Math.floor(12/this.count_columns);
		var data_grid={i: index.toString(), x: (index*width_element)%12, y: Math.floor((index*width_element)/12), w: width_element, h: 2};

		return (
			<div key={el.props.key} data-grid={data_grid}>
			{
				el
			}
			</div>
			);
	}

	// We're using the cols coming back from this to calculate where to add new items.
	onBreakpointChange(breakpoint, cols) {
	    this.setState({
	    breakpoint: breakpoint,
	    cols: cols
	 	});
	}

	onLayoutChange() {
	 	
	}
	
	setLayout(){

	}

	render(){

		return (
	      <div>
	        <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange} onBreakpointChange={ () => this.onBreakpointChange()} 
	         {...this.props}>
	          {React.Children.map(this.props.children, (child,index) => this.createElement(child,index))}	        
	        </ResponsiveReactGridLayout>
	      </div>
    	);

	}


}

