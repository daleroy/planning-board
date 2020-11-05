import UrlLoader from "./loader/UrlLoader.js"
import PlanState from "./PlanState.js";
import Util from '../common/Util';
import LoaderFactory from "./loader/LoaderFactory.js";
import { URL_LOADER } from "../common/Constants.js";



export default class StateInitializer {

    static INITIALIZER;

    constructor(dataLoader, teamLoaderProp, taskLoaderProp){
        this.c_name = 'StateInitializer:' ;
        this.loader = dataLoader ;
        this.teamLoaderProp = teamLoaderProp ;
        this.taskLoaderProp = taskLoaderProp ;

        this.props = {};
        //TODO: Fix props key consistency

        this.props.rowKey = "initiative";
        this.props.columnKey = "period" ;
        this.props.teamPrefix = "team.";
        this.props.capacity = {};
        this.props.capacity.teamHeader = "team";
        this.props.capacity.rtb = "rtb";
        this.props.capacity.available = "available_capacity";

        this.planState = new PlanState();
    }

    setTaskData = (data) => {
        this.taskRawData = data.data ;
        this.planState.setRawTaskData(this.taskRawData);
    }

    setTeamCapacity = (data) => {
        const m_name = 'setTeamCapacity';
        this.teamRawData = data.data ;
        this.planState.setRawTeamData(this.teamRawData);
    }

    async process(){
        const METHOD_NAME = 'process' ;
        await this.processTeamCapacityData();
        await this.processTaskData();

        this.translate();

        return Promise.resolve(this.planState);
    }

    // async processAll(){
    //     const METHOD_NAME = 'processAll' ;
    //     await this.processTeamCapacityData();
    //     await this.processTaskData();
    //     this.translate();

    //     let dataCollection = {planGrid: this.planState, teamCapacity: this.teamRawData, taskRawData: this.taskRawData};

    //     return Promise.resolve(dataCollection);
    // }

    async processTeamCapacityData(){
        const m_name = 'processTeamCapacityData';
        await this.loader.load(this.teamLoaderProp, this.setTeamCapacity);
        Util.logDebug(this.c_name, m_name, 'Team Capacity Processing', this.teamRawData);

        // await dataProvider.load(this.setTeamCapacity)
        
    }

    async processTaskData(){
        const m_name = 'processTeamCapacityData';
        await this.loader.load(this.taskLoaderProp, this.setTaskData).then();
        Util.logDebug(this.c_name, m_name, 'Team Capacity Processing', this.taskRawData);
    }

    translate(){
        this.translateCsvToTeamData();
        this.translateCsvToTaskData();
    }

    translateCsvToTeamData(){
        if(!this.teamRawData){
            console.log('Trying to process CSV but no data found');
            return ;
        }

        let csvTable = this.teamRawData;
        let headers = csvTable[0];

        let teamIndex = headers.indexOf(this.props.capacity.teamHeader);
        let avlCapIndex = headers.indexOf(this.props.capacity.available);
        let rtbCapIndex = headers.indexOf(this.props.capacity.rtb);
        let rowCount = csvTable.length;

        for (let i = 1; i < rowCount; ++i) {
            let teamName = csvTable[i][teamIndex];
            let avlCapacity = parseInt(csvTable[i][avlCapIndex]);
            let rtbCapacity = parseInt(csvTable[i][rtbCapIndex]);

            this.planState.addTeamCapacity(teamName, avlCapacity, rtbCapacity);
        }
        return this.planState;
    }

    translateCsvToTaskData() {
        if(!this.taskRawData){
            console.log('Trying to process CSV but no data found');
            return ;
        }

        let csvTable = this.taskRawData;
        let headers = csvTable[0];

        let rowIndex = headers.indexOf(this.props.rowKey);
        let columnIndex = headers.indexOf(this.props.columnKey);
        let rowCount = this.taskRawData.length;
        let columnCount = headers.length;

        //Remove header row
        let csvTableMinusHeader = csvTable.slice(1);

        let rowValues = Util.extractColumn(csvTableMinusHeader, rowIndex);
        let columnValues = Util.extractColumn(csvTableMinusHeader, columnIndex);
        this.planState.initialize(rowValues, columnValues);

        for (let i = 1; i < rowCount; ++i) {
            let pivotRowValue;
            let pivotColumnValue;
            let teamEstimates = {};
            let taskProps = {};

            for (let j = 0; j < columnCount; ++j) {
                let cellValue = csvTable[i][j];
                let headerValue = headers[j];

                if (j === rowIndex) {
                    pivotRowValue = cellValue;
                } else if (j === columnIndex) {
                    pivotColumnValue = cellValue;
                } else if (headerValue.startsWith(this.props.teamPrefix)) {
                    //Processing Estimate
                    if (Util.isNotBlank(cellValue)) {
                        let estimate = parseInt(cellValue);
                        teamEstimates[headerValue] = estimate;
                    } else {
                        // don't need to process estimate
                    }
                } else {
                    //Processing a regular prop
                    taskProps[headerValue] = cellValue;
                }
            }
            // End Processing of a row
            this.planState.addValue(pivotRowValue, pivotColumnValue, taskProps, teamEstimates);
        }
        return this.planState;
    }

    static getProcessor(){
        if(!StateInitializer.INITIALIZER){
            StateInitializer.INITIALIZER = new StateInitializer();
        }
        return StateInitializer.INITIALIZER; 
    }

    static testProcessor(){
        let teamCapProp = {url:'/data/team-capacity.csv'};
        let taskCapProp = {url:'/data/test-data.csv'};
        
        let loader = LoaderFactory.instance().get(URL_LOADER);

        return new StateInitializer(loader, teamCapProp, taskCapProp);


    }
}
