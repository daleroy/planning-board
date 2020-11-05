import Util from '../common/Util';
import { v4 as uuidv4 } from 'uuid';
import UniqueSortedSet from './UniqueSortedSet';

export default class Table{

    constructor(props){
        this.c_name = 'Table';
        const m_name = 'constructor';
        this.header = [] ;
        this.rowValues = [{}];
        this.idToRowNoMap = new Map();
        this.idToRowMap = new Map();
        this.rowNoToIdMap = new Map();
        this.tupleRowsWithId = [];

        if(props.tabularData){
            // Util.logDebug(this.c_name, m_name, 'constructing table', props.tabularData);
            let tableValues = props.tabularData ;
            this.header = tableValues[0];
            const csvClone = [...tableValues];
            this.rawDataRows = csvClone.slice(1);
            this.tupleRows = this.tableToTupleArray(this.rawDataRows, this.header);

            let rowNo = -1 ;

            this.tupleRows.forEach( row =>{
                rowNo += 1 ;
                let rowId = Util.id();
                let newRow = {id:rowId, ...row}
                this.tupleRowsWithId.push(newRow);
                this.idToRowMap.set(rowId, newRow);
                this.idToRowNoMap.set(rowId, rowNo);
                this.rowNoToIdMap.set(rowNo, rowId);
            });

        }
    }

    tableToTupleArray = (rawDataRows, header)=>{
        const m_name = 'tableToTupleArray';
        // Util.logDebug(this.c_name, m_name, 'tableToTuple', rawDataRows);
        return Util.tableToTupleArray(rawDataRows, header);
    }
    

    pivot = (rowKey, columnKey)=>{
        const m_name = 'pivot' ;

        let rowKeySet = this.getSetForKey(rowKey);
        let columnKeySet = this.getSetForKey(columnKey);


        let dataArray = this.getPivotShell (rowKeySet, columnKeySet);
        // Util.logDebug(this.c_name, m_name, 'dataArray', dataArray);
        let pivotShell = dataArray[0];
        let idToKeysMap = dataArray[1];

        this.tupleRowsWithId.forEach(item =>{
            let itemRowKey = item[rowKey];
            let itemColumnKey = item[columnKey] ;
            pivotShell[itemRowKey][itemColumnKey].rowList.push(item);
        })

        return pivotShell ;
    }

    getSetForKey = (key) => {
        const m_name = 'getSetForKey';
        let keySet = new UniqueSortedSet();
        this.tupleRowsWithId.reduce((item, currVal)=>{
            keySet.add(currVal[key]);
            return keySet ;
        }, keySet);
        return keySet ;
    }

    getPivotShell = (rowKeySet, columnKeySet) => {
        let pivotShell = {}
        let idToKeysMap = new Map();
        rowKeySet.orderedValues.forEach(rowKey => {
            pivotShell[rowKey] = {};
            columnKeySet.orderedValues.forEach(columnKey =>{
                let cellId = uuidv4();
                pivotShell[rowKey][columnKey] = {id:cellId, rowList:[]};
                idToKeysMap.set(cellId, {rowKey:rowKey, columnKey:columnKey});
            })
        })
        return [pivotShell,idToKeysMap] ;
    };

    static fromTabularDataWithHeader(csvValues){
        let props = {tabularData: csvValues};
        let table = new Table(props);
    }
}