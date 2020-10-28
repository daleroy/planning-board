import Task from "./Task.js";

export default class PlanGridData {
    constructor(){
        this.grid = {}
    }


    addValue = (rowValue, columnValue, taskProps, teamEstimate)=>{
        let task = new Task(taskProps,teamEstimate);
        let taskList = [] ;

        if(!this.grid[rowValue]){
            //Row does not exist

            this.grid[rowValue] ={};
            taskList = [task];
            this.grid[rowValue][columnValue] = taskList ;
        }else{
            // Extract existing list 
            taskList = this.grid[rowValue][columnValue] = taskList ;

            if(!taskList){
                taskList = [task];
                this.grid[rowValue][columnValue] = taskList ;
            }else{
                taskList.push(task);
            }

        }
    }

    toString(){
        for (const [ key, value ] of Object.entries(this.grid)) {
            console.log("key=".concat(key));
            console.log("valuetype=".concat(typeof(value)));
            for (const [ key2, value2 ] of Object.entries(value)){
                console.log(("value.key=").concat(key2));
                console.log(("value.value=").concat(value2));
            }
        }

    }


}