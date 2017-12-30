import Logger from './Logger'

//defines the logger class for variables only
export default class ArrayLogger extends Logger{

	constructor(name,obj, prop, interval){
		super(name,obj, prop, interval);
		
		this.type="Array";

	}

	//saves an object of the type {t:1, id:1, value: 12} for each index of the array
	save_state(){
		this.obj[this.prop].forEach( (val, i) => this.logged_data.push({t:this.t, id: i, value:val}));
	}


}