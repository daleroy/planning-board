import Task from "./Task.js";
import UniqueSortedSet from "../ds/UniqueSortedSet.js"
import Util from '../ds/Util'

export default class PlanGridData {
    constructor(){
        this.grid = {};
        this.teamCapacity = {};
        this.columnKeys = new UniqueSortedSet();
        this.rowKeys = new UniqueSortedSet();
        this.cellIdToKeyMap = new Map();
        this.taskMaster = new Map();
        this.teamCapacitySummary = new Map();

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
                this.cellIdToKeyMap.set(id, {rowKey:rowKey, columnKey:columnKey});
                this.grid[rowKey][columnKey]={id:id, taskList:[]};
            });
            colNo = -1 ;
        });

        //Initialize capacity summary for each column

        this.orderedColumnKeys().forEach(columnKey => {
            this.teamCapacitySummary[columnKey] = new Map();
        });
    }

    addValue = (rowKey, columnKey, taskProps, teamEstimate)=>{
        // Initialize should have been called before
        Util.log('In Add Value');
        Util.logo('rowKey', rowKey);
        Util.logo('teamEstimate', teamEstimate)
        

        let task = new Task(taskProps,teamEstimate);
        this.taskMaster.set(task.id, task);
        this.grid[rowKey][columnKey].taskList.push(task);

        this.handleAddCell(rowKey, columnKey, task);
    }

    handleAddCell = (rowKey, colKey, task)=>{
        this.summarizeTeamEstimates(Util.adder, rowKey, colKey, task);
    };

    handleMove = (taskId, fromCellId, toCellId)=>{
        // get task
        let task = this.task.get(taskId);
        
        //Remove from previous location
        const [removedRowKey,removedColKey] = this.keyForCell(fromCellId);
        let tasksAtPrevLocation = this.grid[removedRowKey][removedColKey].taskList ;
        Util.removeItem(tasksAtPrevLocation, taskId);
        this.summarizeTeamEstimates(Util.substractor, removedRowKey, removedColKey, task);
        
        const [targetRowKey, targetColKey] = this.keyForCell(toCellId);
        let tasksAtTargetLocation = this.grid[targetRowKey][targetColKey].taskList ;
        tasksAtTargetLocation.push(task);
        this.summarizeTeamEstimates(Util.adder, targetRowKey, targetColKey,task);
    }

    

    summarizeTeamEstimates = (aggFn, rowKey, colKey, task)=>{
        Util.log('In Summarize');
        Util.logo('Row Key ', rowKey);
        Util.logo('Column Key ', colKey);
        Util.logo('Task',task);

        let teamSummaryForCol = this.teamCapacitySummary[colKey];
        let teamEstimates = task.teamEstimates
        

        if(!teamEstimates) return ;
        for(const [team, estimate] of Object.entries(teamEstimates)){
            let newTotalEstimate ;
            if(teamSummaryForCol.has(team)){
                let currTeamSummaryRow  = teamSummaryForCol.get(team);
                newTotalEstimate = aggFn(currTeamSummaryRow.totalEstimate,estimate) ;
            }else{
                newTotalEstimate = aggFn(0,estimate) ; 
            }
            let capacityRow = this.teamCapacity[team];
            let pendingCapacity = capacityRow.netCapacity - newTotalEstimate ;
            let teamSummaryRow = {...capacityRow, totalEstimate:newTotalEstimate, pendingCapacity: pendingCapacity};
            teamSummaryForCol.set(team, teamSummaryRow);
        }
    }





    keyForCell(cellId) {
        let keyMap = this.cellIdToKeyMap.get(cellId);
        let removedRowKey = keyMap.rowKey;
        let removedColKey = keyMap.colKey;
        return [removedRowKey, removedColKey];
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