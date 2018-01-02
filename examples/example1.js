import Monitor from 'variable-monitor';
import Dashboard from '../src/index';


var obj={a:[1,2],b:[1,2], c:[1,2]};
var obj2={a:[1,2], b:[1,2],c:[1,2]};


var monitor1=new Monitor("Game Monitor");
monitor1.add({name:"player_scores",obj:obj,prop:"a",interval:1});
monitor1.add({name:"player_requests",obj:obj,prop:"b",interval:1});
monitor1.add({name:"player_denials",obj:obj,prop:"c",interval:20});

var monitor2=new Monitor("Cache Monitor");
monitor2.add({name:"cache1",obj:obj2,prop:"a",interval:1});
monitor2.add({name:"cache2",obj:obj2,prop:"b",interval:4});
monitor2.add({name:"cache3",obj:obj2,prop:"c",interval:1});


for(var i=0;i<100;i++){
	obj.a=Array.from({length: Math.floor(Math.random()*15)}, () => Math.random() * 9);
	obj.b=Array.from({length: Math.floor(Math.random()*15)}, () => Math.random() * 9);
	obj.c=Array.from({length: Math.floor(Math.random()*15)}, () => Math.random() * 9);
	
	obj2.a=Array.from({length: 10}, () => Math.random() * 9);
	obj2.b=Array.from({length: 40}, () => Math.random() * 9);
	obj2.c=Array.from({length: 15}, () => Math.random() * 9);

	monitor1.tick();
	monitor2.tick();
}

ReactDOM.render(<Dashboard datasets={[monitor1.dataset,monitor2.dataset]}/>,document.getElementById('root'));