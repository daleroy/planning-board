import DataProvider from "./DataProvider.js"
import PlanGridData from "./PlanGridData.js";

export default class PlanGridDataProcessor {
    constructor(){
        this.props = {};
        this.props.rowKey = "initiative";
        this.props.columnKey = "period" ;
        this.props.teamPrefix = "team.";
    }

    csvProcessCallback = (data) => {
        this.papaData = data ;
    }


    async process(){
        let dataProvider = new DataProvider();
        await dataProvider.processCsvData(this.csvProcessCallback);
        console.log("Grid Data Processor");
        // console.log(this.papaData);
        let csvTable = this.papaData.data ;
        let headers = csvTable[0];
        console.log(headers);

        let rowIndex = headers.indexOf(this.props.rowKey);
        let columnIndex = headers.indexOf(this.props.columnKey);
        let rowCount = this.papaData.data.length - 1
        let columnCount = headers.length ;

        let planGridData = new PlanGridData();

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

            planGridData.addValue(pivotRowValue, pivotColumnValue, taskProps, teamEstimates)
        }
        return this.planGridData = planGridData;
    }

    static getProcessor(){
        return new PlanGridDataProcessor();
    }
}
