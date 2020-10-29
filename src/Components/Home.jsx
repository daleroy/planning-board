import React , { useState, useEffect} from 'react';
import {GridDataContext} from '../App';
import PlanGridDataProcessor from '../state/PlanGridDataProcessor';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';

const TaskContainer = styled.div`
    flex: 1 1 10px;
    background-color: #f0f8ff;
    border: 1px solid #d8e8f8;
    font-size: 14px;
`;

const RowContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

const RowId = styled.div`
    font-size: 18px;
    flex: 1 1 20%;
    border: 1px solid black;
`
const Row = styled.div`
    flex: 1 1 20%;
    border: 1px solid black;
`;

const getGridData = () => {
  let dataProcessor = PlanGridDataProcessor.getProcessor() ;

  return Promise.all([
      dataProcessor.processTaskData(),
      dataProcessor.processTeamCapacityData()
  ]);
}



export default function TopToolBar() {
    const [gridData, setGridData] = React.useState({});
    useEffect(() => {
        getGridData().then(data => {
            setGridData(data[0])
        });
    }, []);

    const onDragEnd = result => { }

    const renderColumnHeaders = ({columnKeys}) => {
        if (!columnKeys) {
            return
        }

        return columnKeys.orderedValues.map((id) => {
            return (<Row>{id}</Row>);
        });
    }

    const renderRow = (rowValues, columnKeys) => {
        return columnKeys.map((colId) => {
            const {taskList} = rowValues[colId];


            return (<Row>
                {taskList.map((task) => {
                    return (<TaskContainer>{task.mfProps.ref}</TaskContainer>);
                })}
            </Row>)
        })
    }

    const renderRows = ({columnKeys, rowKeys, grid}) => {
        if (!rowKeys) {
            return
        }

        return rowKeys.orderedValues.map((rowId) => {
            const rowValues = grid[rowId];
            const rows = renderRow(rowValues, columnKeys.orderedValues);
            return (
                <RowContainer >
                    <RowId>{rowId}</RowId>
                    {rows}
                </RowContainer >
            );
        });
    }

    console.dir(gridData);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <RowContainer >
                <Row>Initatives</Row>
                {renderColumnHeaders(gridData)}
            </RowContainer >
            {renderRows(gridData)}
        </DragDropContext>
    )
}
