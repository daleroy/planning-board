import Task from "./Task.js";
import UniqueSortedSet from "../ds/UniqueSortedSet.js"

export default class PlanGridData {
    constructor(){
        this.grid = {};
        this.teamCapacity = {};
        this.columnKeys = new UniqueSortedSet();
        this.rowKeys = new UniqueSortedSet();

    }

    orderedRowKeys(){
        return this.rowKeys.orderedValues;
    }

    orderedColumnKeys(){
        return this.columnKeys.orderedValues;
    }

    generateId(rowNo, colNo){
        return ''+rowNo + ',' + colNo ;
    }

    initialize(rowValues, columnValues){
        this.rowKeys = rowValues.reduce((rowKeys,item)=>{
            rowKeys.add(item);
            return rowKeys;
        },this.rowKeys);

        this.columnKeys = columnValues.reduce((columnKeys, item)=>{
            columnKeys.add(item);
            return columnKeys ;
        },this.columnKeys)

        let [rowNo, colNo] =[-1,-1];

        this.orderedRowKeys().forEach(rowKey => {
            rowNo += 1 ;
            this.grid[rowKey]={}
            this.orderedColumnKeys().forEach(columnKey => {
                colNo +=1 ;
                let id = this.generateId(rowNo, colNo);
                this.grid[rowKey][columnKey]={id:id, taskList:[]};
            });
            colNo = -1 ;
        });
    }

    addValue = (rowValue, columnValue, taskProps, teamEstimate)=>{
        // Initialize should have been called before
        let task = new Task(taskProps,teamEstimate);
        this.grid[rowValue][columnValue].taskList.push(task);
    }

    addTeamCapacity(teamName, avlCapacity, rtbCapacity){
        let capacityRow = {name:teamName, availableCapacity:avlCapacity, rtbCapacity:rtbCapacity, netCapacity: avlCapacity-rtbCapacity};
        this.teamCapacity[teamName] = capacityRow;
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