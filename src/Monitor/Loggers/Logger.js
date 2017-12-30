//base class for all loggers
//defines the main interface
export default class Logger{

	constructor(name,obj_reference, prop,interval){	
		this.name=name;
		this.obj=obj_reference;
		this.prop=prop;
		this.interval=interval;
		this.logged_data=[];
		this.t=0;
	}

	//called at each timestep of a program, triggers logger to store the referred data
	tick(){
		if(this.t%this.interval == 0){
			this.save_state();
		}
		this.t++;

	}

	//gets overriden by children class
	//saves all data from the referenced object/array/variable/etc.
	save_state(){

	}

	get data(){
		return {
			name: this.name,
			data:this.logged_data,
			type:this.type
		};
	}

}