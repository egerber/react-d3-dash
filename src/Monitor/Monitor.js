import VariableLogger from './Loggers/VariableLogger';
import ArrayLogger from './Loggers/ArrayLogger';


export default class Monitor{

    constructor(name="monitor_name"){
        this.name=name;
        this.data_loggers={};
    }

    get(name){
    	return this.data_loggers[name];
    }

    //adds a variable//array to be tracked
    //creates a Logger object
    add({
        name= "undefined variable",
        obj=null,
        prop="null",
        interval=1,
        }= {}){

        if(obj==null || obj[prop]===undefined){
            throw("Error: Object or property " + prop + " does not exist");
        }

        //check if it is a variable
        if(!isNaN(obj[prop])){ //Variable
            this.data_loggers[name]=new VariableLogger(name, obj,prop,interval);
        }else if(obj[prop].constructor ===Array && obj[prop].every((el) => !isNaN(el))){ //Array of numbers
            this.data_loggers[name]=new ArrayLogger(name,obj,prop,interval);
        }else{//add more cases for more data types to be logged here

        }
    }

    //indicate the next time step
    //triggers Monitor to fetch data for all variables
    tick(){
        for(let name in this.data_loggers){
            this.data_loggers[name].tick();
        }
    }

    get length(){
        return Object.keys(this.data_loggers).length;
    }

    save(filename){
        //TODO
    }

    [Symbol.iterator]() {
        
        var counter=0;
        var keys=Object.keys(this.data_loggers);
        var length=keys.length;
        var data=this.data_loggers;
        
        return {
                next: function(){
                    return { value: data[keys[counter++]], done: counter>length}
                }   
        }
     };



}