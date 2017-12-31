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
		datasets:[],
	}
	    
	constructor(props) {
        super(props);

        this.state = {
            checked: [],
            expanded: [],
            selected_datasets:[]
        };
    }

	createElement(dataset,index){
		return <ChartSelector key={dataset.name} dataset={dataset}/>
	}

	createNode(dataset){

		var node={
			label: dataset.name,
			value: dataset.name
		}

		if(dataset.type==="Dataset"){
			var children=[];
			for(let child of dataset.data){
				children.push(this.createNode(child))
			}

			node.children=children;
		}

		return node;
	}

	createTreeData(){
		var treeview_data=[];
		for(let dataset of this.props.datasets){
			
			let node={
				label: dataset.name,
				value: dataset.name,
			};

			if(dataset.type==="Dataset"){
				var children=[];
				for(let child of dataset.data){
					children.push(this.createNode(child))
				}

				node.children=children;
			}
			
			treeview_data.push(node);
		}

		return treeview_data;
	}

	checkHandler(checked){
		//TODO make work all monitors
		var datasets=checked.map( item_name => this.props.monitors[0].get(item_name).data);
		this.setState({checked,selected_datasets:datasets});
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
						{this.state.selected_datasets.map( (dataset,index) => this.createElement(dataset,index))}
					</DynamicGrid>
				</div>
			</div>
		);

	}

}