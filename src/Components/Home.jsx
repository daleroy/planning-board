import React , { useState, useEffect} from 'react';
import {GridDataContext} from '../App';
import PlanGridDataProcessor from '../state/PlanGridDataProcessor';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    height: 800px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;

const ColumnContainer = styled.h4`
    flex: 1 1 10px;
    border: 1px dashed red;
`;

const RowContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

const Row = styled.h1`
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

    const getRowFromGrid = (rowId, columnKeys, grid) => {
        const rowValues = grid[rowId];

        columnKeys.forEach((rowId) => {
            if (!rowValues.hasOwnProperty(rowId)) {
                rowValues[rowId] = []
            }
        });

        return rowValues;
    }

    const renderRow = (rowValues, columnKeys) => {
        return columnKeys.map((colId) => {
            const tasks = rowValues[colId];


            return (<Row>
                {tasks.map((task) => {
                    return (<ColumnContainer>{task.mfProps.ref}</ColumnContainer>);
                })}
            </Row>)
        })
    }

    const renderRows = ({columnKeys, rowKeys, grid}) => {
        if (!rowKeys) {
            return
        }

        return rowKeys.orderedValues.map((rowId) => {
            const rowValues = getRowFromGrid(rowId, columnKeys.orderedValues, grid);
            const rows = renderRow(rowValues, columnKeys.orderedValues);
            return (
                <RowContainer >
                    <Row>{rowId}</Row>
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
