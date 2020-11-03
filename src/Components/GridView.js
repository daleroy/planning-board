import React, { useState, useContext, useEffect} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import {GridContext} from '../App.js';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Util from '../ds/Util';
import PlanGridDataProcessor from '../state/PlanGridDataProcessor';

const getGridData = () => {
    const dataProcessor = PlanGridDataProcessor.getProcessor() ;
    return dataProcessor.processAll();
}

export default function GridView({csvValues}){
    const className = 'GridView';
    const [header, setHeader] = useState([]);

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    // const [rowData, setRowData] = useState([
    //     {make: "Toyota", model: "Celica", price: 35000},
    //     {make: "Ford", model: "Mondeo", price: 32000},
    //     {make: "Porsche", model: "Boxter", price: 72000}
    // ]);

    const [rowData, setRowData] = useState([]);

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }



    useEffect(() => {
        Util.logTrace(className, 'useEffect', 'useEffect called', 'useEffectCalled');
        
        getGridData().then(data => {
            let m_name = 'useEffect';
            Util.logDebug(className, m_name, 'Inside isIterableCheck',data);
            let tableValues = data['taskRawData'];
            if(Util.isIterable(tableValues)){
                const csvClone = [...tableValues];
                const csvRows = csvClone.slice(1);
                const header = tableValues[0];

                const modifiedHeader = header.map(item=>{
                    if(item.startsWith('team.')){
                        item = item.substring(5);
                    }
                    return item ;
                });

                modifiedHeader.forEach(element => {
                    Util.logDebug(className, m_name, 'header element', element);
                });

                const rowData = Util.tableToTupleArray(csvRows, modifiedHeader);
                setRowData(rowData);
                Util.logDebug(className, m_name, 'Header in isIterable',modifiedHeader);
                Util.logDebug(className, m_name, 'CsvRows isIterable',csvRows);
                Util.logDebug(className, m_name, 'Row data in isIterable',rowData);
                const gridColumn = modifiedHeader.map(x=>{return(<AgGridColumn field={x} editable={true}  sortable={true}></AgGridColumn>)})
                Util.logDebug(className, m_name, 'Grid column in isIterable',gridColumn);

                for(let [key, value] of Object.entries(rowData[0])){
                    Util.logDebug(className, m_name, 'row data', key.concat(':').concat(value));
                }
                Util.logDebug(className, m_name, 'Privacy Team Estimate', rowData[0]['team.privacy']);

                setRowData(rowData);
                setHeader(modifiedHeader);
            }
        });
    }, []);

    return (
        <div className="ag-theme-alpine" style={ { height: 400, width: 1800 } }>
                <AgGridReact onGridReady={onGridReady} rowData={rowData}>
                    {header.map(x=>{return (<AgGridColumn field={x} headerName={x} editable={true}  sortable={true}></AgGridColumn>)})}
                </AgGridReact>
        </div>
    );
};
                    {/* <AgGridColumn field="model" editable={true}  sortable={true}></AgGridColumn>
                    <AgGridColumn field="price" editable={true} sortable={true}></AgGridColumn> */}
