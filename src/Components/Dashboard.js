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
			
			treeview_data.push(this.createNode(dataset));
		}

		return treeview_data;
	}

	checkHandler(checked){

		var all_datasets={};
		for(let dataset of this.props.datasets){
			for(let data of dataset.data){
				all_datasets[data.name]=data;
			}
		}

		//TODO make work all monitors
		var selected_datasets=checked.map( item_name => all_datasets[item_name]);
		this.setState({checked,selected_datasets:selected_datasets});
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