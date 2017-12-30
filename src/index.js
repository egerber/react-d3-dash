//import './include/bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import Monitor from './Monitor/Monitor';
import Dashboard from './Components/Dashboard';

//import stylesheets
import './index.css';


var data=[{t:1,value:3},{t:1,value:12},{t:1,value:13},{t:2,value:22},{t:2,value:12},{t:2,value:3},{t:2,value:44}];

var data=[];
for(let i=0;i<400;i++){
	for(let j=0;j<10;j++){
		data.push({id: Math.floor(Math.random()*100),t:i,value:Math.random()*100});
	}
}

var obj={a:[12,100,20],b:[1,2,3],c:[10,50,111]};

var monitor1=new Monitor();


monitor1.add({name:"a_logger",obj:obj,prop:"a",interval:1});
monitor1.add({name:"b_logger",obj:obj,prop:"b",interval:1});
monitor1.add({name:"c_logger",obj:obj,prop:"c",interval:1});


for(var i=0;i<100;i++){
	obj.a=Array.from({length: Math.floor(Math.random()*15)}, () => Math.random() * 9);
	obj.b=Array.from({length: Math.floor(Math.random()*15)}, () => Math.random() * 9);
	obj.c=Array.from({length: Math.floor(Math.random()*15)}, () => Math.random() * 9);
	monitor1.tick();
}


ReactDOM.render(<Dashboard monitors={[monitor1]}/>,document.getElementById('root'));