import React, { useState, useEffect} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Util from '../common/Util';

export default function GridView({gridData, setGridData}){
    const c_name = 'GridView';

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [header, setHeader] = useState([]);
    const [gridRowData, setGridRowData] = useState([]);

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const onChange =(cellChangeEvent)=>{
        const m_name = 'onChange';
        Util.logDebug(c_name, m_name, 'Grid Change', cellChangeEvent);
    };

    const prepGridView = ()=>{
        const m_name = 'prepGridView' ;
        Util.logDebug(c_name, m_name, 'Processing for Grid', gridData);

        let tableValues = gridData.taskRawData ;

        if(Util.isIterable(tableValues)){
            const csvClone = [...tableValues];
            const csvRows = csvClone.slice(1);
            const header = tableValues[0];

            let modifiedHeader = header.map(item=>{
                if(item.startsWith('team.')){
                    item = item.substring(5);
                }
                return item ;
            });

            modifiedHeader.forEach(element => {
                Util.logDebug(c_name, m_name, 'header element', element);
            });
            let tmpGridRowData = Util.tableToTupleArray(csvRows, modifiedHeader);
            Util.logDebug(c_name, m_name, 'Header in isIterable',tmpGridRowData);

            // setGridRowData(tmpGridRowData);
            setHeader(modifiedHeader);
            setGridRowData(tmpGridRowData);

            Util.logDebug(c_name, m_name, 'Header in isIterable',modifiedHeader);
            Util.logDebug(c_name, m_name, 'CsvRows isIterable',csvRows);
            Util.logDebug(c_name, m_name, 'Row data in isIterable',gridRowData);

            let gridColumn = modifiedHeader.map(x=>{return(<AgGridColumn field={x} editable={true}  sortable={true}></AgGridColumn>)})

            Util.logDebug(c_name, m_name, 'Grid column in isIterable',gridColumn);

            if(gridApi){
                let params = {force: true}
                gridApi.refreshCells(params);
            }
        }
    }


    useEffect(() => {
        Util.logTrace(c_name, 'useEffect', 'useEffect called', 'useEffectCalled');
        prepGridView();
    }, []);

    // prepGridView();
    if(!header) return ;
    return (
        <div className="ag-theme-alpine" style={ { height: 400, width: 1800 } }>
                <AgGridReact onGridReady={onGridReady} rowData={gridRowData} onCellValueChanged={onChange}>
                    {header.map(x=>{return (<AgGridColumn field={x} headerName={x} editable={true}   sortable={true}></AgGridColumn>)})}
                </AgGridReact>
        </div>
    );
};
