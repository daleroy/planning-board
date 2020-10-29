import DataProvider from "./DataProvider.js"
import PlanGridData from "./PlanGridData.js";
import Util from '../ds/Util';

export default class PlanGridDataProcessor {
    constructor(){
        this.props = {};
        //TODO: Fix props key consistency

        this.props.rowKey = "initiative";
        this.props.columnKey = "period" ;
        this.props.teamPrefix = "team.";
        this.props.capacity = {};
        this.props.capacity.teamHeader = "team";
        this.props.capacity.rtb = "rtb";
        this.props.capacity.available = "available_capacity";

        this.planGridData = new PlanGridData();
    }

    setTaskData = (data) => {
        this.taskRawData = data ;
    }

    setTeamCapacity = (data) => {
        this.teamRawData = data ;
    }

    async process(){
        await this.processTaskData();
        await this.processTeamCapacityData();

        return Promise.resolve(this.planGridData)
    }

    async processTeamCapacityData(){
        let dataProvider = DataProvider.getTeamCapacityProvider();
        await dataProvider.processCsvData(this.setTeamCapacity);
        console.log("Procesing Team Capacity Data");

        let csvTable = this.teamRawData.data ;
        let headers = csvTable[0];

        let teamIndex = headers.indexOf(this.props.capacity.teamHeader);
        let avlCapIndex = headers.indexOf(this.props.capacity.available);
        let rtbCapIndex = headers.indexOf(this.props.capacity.rtb);
        let rowCount = csvTable.length;

        for (let i = 1; i < rowCount ; ++i) {
            let teamName = csvTable[i][teamIndex];
            let avlCapacity = parseInt(csvTable[i][avlCapIndex]);
            let rtbCapacity = parseInt(csvTable[i][rtbCapIndex]);

            this.planGridData.addTeamCapacity(teamName, avlCapacity, rtbCapacity);
        }
        return this.planGridData;
    }

    async processTaskData(){
        let dataProvider = DataProvider.getTasksProvider()
        await dataProvider.processCsvData(this.setTaskData);

        let csvTable = this.taskRawData.data ;
        let headers = csvTable[0];

        let rowIndex = headers.indexOf(this.props.rowKey);
        let columnIndex = headers.indexOf(this.props.columnKey);
        let rowCount = this.taskRawData.data.length;
        let columnCount = headers.length ;

        //Remove header row
        let csvTableMinusHeader = csvTable.slice(1);

        console.log('Before Initialize = '+ csvTableMinusHeader);
        let rowValues = Util.extractColumn(csvTableMinusHeader,rowIndex);
        console.log('rowValues'+ rowValues);
        let columnValues = Util.extractColumn(csvTableMinusHeader, columnIndex);
        console.log('columnValues'+ columnValues);
        this.planGridData.initialize(rowValues, columnValues);

        for (let i = 1; i < rowCount ; ++i) {
            let pivotRowValue ;
            let pivotColumnValue ;
            let teamEstimates = {};
            let taskProps = {};

            for (let j = 0 ; j<columnCount ; ++j){
                let cellValue = csvTable[i][j];
                let headerValue = headers[j];

                if(j === rowIndex){
                    pivotRowValue = cellValue;
                }else if(j=== columnIndex){
                    pivotColumnValue = cellValue ;
                }else if(headerValue.startsWith(this.props.teamPrefix)){
                    //Processing Estimate
                    if(cellValue !== ""){
                        let estimate = parseInt(cellValue);
                        teamEstimates[headerValue] = estimate ;
                    }else{
                        // don't need to process estimate
                    }
                }else{
                    //Processing a regular prop
                    taskProps[headerValue] = cellValue ;
                }
            }
            // End Processing of a row

            this.planGridData.addValue(pivotRowValue, pivotColumnValue, taskProps, teamEstimates)
        }
        return this.planGridData ;
    }



    static getProcessor(){
        return new PlanGridDataProcessor();
    }
}
