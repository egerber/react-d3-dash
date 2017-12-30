import '../include/bootstrap';

import React from 'react';
import _ from 'lodash';
import ChartSelector from './ChartSelector';
import DynamicGrid from './DynamicGrid';
import CheckboxTree from 'react-checkbox-tree';

import './Dashboard.css';
import '../include/checkBoxTree';

export default class Dashboard extends React.Component{

	static defaultProps={
		monitors:[],
	}
	    
	constructor(props) {
        super(props);

        this.state = {
            checked: [],
            expanded: [],
            datasets:[]
        };
    }

	createElement(dataset,index){
		return <ChartSelector key={dataset.name} dataset={dataset}/>
	}

	createTreeData(){
		var treeview_data=[];
		for(let monitor of this.props.monitors){
			
			let node={
				label: monitor.name,
				value: monitor.name,
				children:[]
			};

			
			for(let data_logger of monitor){
				node.children.push({
					label:data_logger.name,
					value: data_logger.name
				});
			}

			treeview_data.push(node);
		}

		return treeview_data;
	}

	checkHandler(checked){
		//TODO make work all monitors
		var datasets=checked.map( item_name => this.props.monitors[0].get(item_name).data);
		this.setState({checked,datasets});
	}

	render(){
		return (	
			<div className="dashboard row">
				<div className="col-md-2">
					<CheckboxTree
					nodes={this.createTreeData()}
					checked={this.state.checked}
	                expanded={this.state.expanded}
	                onCheck={checked => this.checkHandler(checked)}
	                onExpand={expanded => this.setState({ expanded })}/>
	            </div>
	            <div className="col-md-10">
					<DynamicGrid>
						{this.state.datasets.map( (dataset,index) => this.createElement(dataset,index))}
					</DynamicGrid>
				</div>
			</div>
		);

	}

}