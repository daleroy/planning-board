import React, { useState, useEffect} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Util from '../common/Util';

export default function GridView({gridData, setGridData}){
    const c_name = 'GridView';
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

    const onChange =(cellChangeEvent)=>{
        const m_name = 'onChange';
        Util.logDebug(c_name, m_name, 'Grid Change', cellChangeEvent);
    };



    useEffect(() => {
            let m_name = 'useEffect';
            Util.logDebug(c_name, m_name, 'Inside isIterableCheck',gridData);
            let tableValues = gridData['taskRawData'];
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
                    Util.logDebug(c_name, m_name, 'header element', element);
                });

                const rowData = Util.tableToTupleArray(csvRows, modifiedHeader);
                setRowData(rowData);
                Util.logDebug(c_name, m_name, 'Header in isIterable',modifiedHeader);
                Util.logDebug(c_name, m_name, 'CsvRows isIterable',csvRows);
                Util.logDebug(c_name, m_name, 'Row data in isIterable',rowData);
                const gridColumn = modifiedHeader.map(x=>{return(<AgGridColumn field={x} editable={true}  sortable={true}></AgGridColumn>)})
                Util.logDebug(c_name, m_name, 'Grid column in isIterable',gridColumn);

                for(let [key, value] of Object.entries(rowData[0])){
                    Util.logDebug(c_name, m_name, 'row data', key.concat(':').concat(value));
                }
                Util.logDebug(c_name, m_name, 'Privacy Team Estimate', rowData[0]['team.privacy']);

                setRowData(rowData);
                setHeader(modifiedHeader);
            }
        }, [gridData]);

        return (
            <div className="ag-theme-alpine" style={ { height: 400, width: 1800 } }>
                <AgGridReact onGridReady={onGridReady} rowData={rowData} onCellValueChanged={onChange}>
                    {header.map(x=>{return (<AgGridColumn field={x} headerName={x} editable={true}   sortable={true}></AgGridColumn>)})}
                </AgGridReact>
            </div>
        );
};
