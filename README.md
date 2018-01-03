# react-d3-dash
React-d3-dash is a library for building dashboard to visualize your data using ReactJS and D3.

![preview](https://user-images.githubusercontent.com/13987033/34472838-bc14e110-efbe-11e7-9993-963fa759815b.png)

React-d3-dash provides UI components out of the box to visualize various data-types but allows to extend more chart invididual chart types using D3.

## Features
- Grid based layout
- Add/Remove Charts
- Drag and drop widget re-ordering
- Changing Chart Types
- Interactive Charts

## Installation
```
npm install react-d3-dash
```

## Use

```javascript
import Dashboard from 'react-d3-dash';
import {React} from 'react';
import {ReactDOM} from 'react-dom';

var dataset1={
	name: "my_dataset_1",
	type: "Dataset"
	data: [
		{
		name: "logged_var_arr1",
		type: "Array",
		data:[
			{t:1, id:1, value:12},
			{t:2, id:2, value:15},
			{t:5, id:3, value:18}
			...
			]
		},
		{
		name: "logged_arr_2",
		type: "Array",
		data:[
			{t:2, id:3, value:12},
			{t:2, id:3, value:14},
			...
			]
		}
	]
}	
		
var dataset2={
	...
}

ReactDOM.render(<Dashboard datasets={[dataset1, dataset2]}/>, document.getElementById('container'));

```

Dashboard only accepts an array of datasets, where each dataset can contain other datasets. Each dataset must be an object with the fields name (String) type (String) and data (Array). Each data-item specifies the type of the data (e.g. Array, Variable, Dataset) and the array of data items (e.g. list of objects of the form {t, id, value}).
All Datasets and Data items are displayed in a tree view and can be selected for visualization if an appropriate Chart type exists.

## Documentation

### Adding new Chart types
The Dashboard can be used with the provided basic chart types (Line-chart, Bar-chart, Pie-chart, etc.) but can be easily extended for more types. 

Every new Chart must inherit from D3Chart. It defines a React Wrapper for D3 Charts and handles the rendering. The Child class must override 

```javascript
renderD3(svg,dataset,selector,width,height,padding){}
```
and implement the d3 Code for initializing and updating the chart. 
Selector defines a filter function for selecting the data to be displayed of the whole dataset. This should be done by calling 
```javascript 
var selected_data=dataset.data.filter(selector)
```
Every Child class must also override the method 

```javascript
accepts(type){
	if(type==="some particular type"){
		return true;
	}elseif type==="some other type"){
		return true;
	}

	return false;
}
```
which receives the type of a dataset and returns whether it can display this datatype. This is important for selecting dynamically between different Chart-types for the same dataset.

Afterwards the Map chartTypes in  ```src/Components/Charts/ChartTypes.js``` has to be extended 
```javascript
...
chartTypes.set("My New Chart-type",MyChart);
...
```


## TODO List

- [ ] Histogram Chart
- [ ] Graph Chart
- [ ] Select multiple variables to be displayed in the same chart
- [ ] Global Color-Theme selector for the dashboard
- [ ] Adding more Data-Selectors (Interval-selection, etc.)

