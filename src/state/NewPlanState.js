/*
External Interfaces
    pivotView - provides holder for columnKeys, rowKeys, organized data, pivotKeys
*/
import Util from '../common/Util';
import * as constants from '../common/Constants';
import Table from '../ds/Table';


export default class NewPlanState{
    static c_name = 'NewPlanState';

    initFromCsv(teamCsvValues, taskCsvValues, pivotRowKey, pivotColumnKey){

        let taskProps = {tabularData:taskCsvValues};
        this.taskTable = new Table(taskProps);

        this.taskTable.createPivotView(pivotRowKey, pivotColumnKey);

        let teamProps = {tabularData:teamCsvValues};
        this.teamTable = new Table(teamProps);

        this.summarizeTeamEstimates();
    }

    getTeamCapacitySummary = ()=>{
        return this.teamCapacitySummary ;
    }

    handleMove = (taskId, fromCellId, toCellId)=>{
        const m_name = 'handleMove';
        let args = {taskId:taskId, fromId:fromCellId, toId:toCellId};
        Util.logDebug(NewPlanState.c_name, m_name, 'before delegation', args);

        this.taskTable.move(taskId, fromCellId, toCellId);
        //TODO: Could be more optimal
        this.summarizeTeamEstimates();

        return this;
    }


    // TODO: Clean this up
    summarizeTeamEstimates = ()=>{
        const m_name = 'summarizeTeamEstimates';

        let headers = this.taskTable.getHeader();
        let pivotView = this.taskTable.pivot;

        // Util.log(NewPlanState.c_name, m_name, 'looking at pivot', pivotView);

        let aggFn = Util.adder();
        let teamCapacitySummary = new Map();

        pivotView.rowKeys.forEach(rowKey =>{
            pivotView.colKeys.forEach(colKey =>{
                if(!teamCapacitySummary.has(colKey)){
                    teamCapacitySummary.set(colKey, new Map());
                }
                let tasks = pivotView.viewModel[rowKey][colKey].rowList;
                let colSummary = teamCapacitySummary.get(colKey);

                tasks.forEach(task =>{
                    headers.forEach(header => {
                        if(header.includes(constants.TEAM_PREFIX)){
                            let team = header ;
                            if(Util.isNotBlank(task[team])){
                                let currEstimate = parseInt(task[team]);
                                let baselineEstimate = 0;
                                if(colSummary.has(header)){
                                    let currTuple = colSummary.get(header);
                                    baselineEstimate = currTuple.totalEstimate ;
                                }

                                let newTotalEstimate = baselineEstimate + currEstimate ;
                                let capacityRow = this.teamTable.find(constants.TEAM_COLKEY, header)[0];
                                let availableCapacity = capacityRow.available_capacity ;
                                let rtb = capacityRow.rtb ;
                                let netCapacity = availableCapacity - rtb ;
                                let pendingCapacity = netCapacity - newTotalEstimate ;
                                let teamSummaryRow = {...capacityRow, netCapacity:netCapacity,
                                                    totalEstimate:newTotalEstimate, pendingCapacity: pendingCapacity};
                                colSummary.set(team, teamSummaryRow);
                            }
                        }
                    })
                })
            });
        });

        this.teamCapacitySummary = teamCapacitySummary ;

    }

    /*
    let pivot = {
                key:pivotKey,
                rowKeys:pivotRowKeys,
                colKeys:pivotColumnKeys,
                idToKeysMap:idToKeysMap,
                viewModel:pivotView
            }
    */

    //TODO: replace with getter
    pivotView = ()=>{
        return this.taskTable.pivot ;
    }

    static fromCsvValues(teamCsvValues, taskCsvValues, pivotRowKey, pivotColumnKey){
        let newPlanState = new NewPlanState();
        newPlanState.initFromCsv(teamCsvValues, taskCsvValues, pivotRowKey,pivotColumnKey);
        return newPlanState ;
    }
}
