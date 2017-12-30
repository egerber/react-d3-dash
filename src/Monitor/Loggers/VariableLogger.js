import Logger from './Logger'

//defines the logger class for variables only
export default class VariableLogger extends Logger{

	constructor(name,obj, prop, interval){
		super(name,obj, prop, interval);
		this.type="Variable";
	}

	//
	save_state(){
		this.logged_data.push({t: this.t, value: this.obj[this.prop]});
	}


}