import React , { useState, useEffect} from 'react';
import {GridDataContext} from '../App';
import PlanGridDataProcessor from '../state/PlanGridDataProcessor';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {Draggable, Droppable} from 'react-beautiful-dnd';

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
const Header = styled.h3`
    flex: 1 1 20%;
    border: 1px solid black;
`;

const getGridData = () => {
  let dataProcessor = PlanGridDataProcessor.getProcessor() ;

  return dataProcessor.process();
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
            return (<Header>{id}</Header>);
        });
    }

    const renderRow = (rowValues, columnKeys) => {
        return columnKeys.map((colId) => {
            const {taskList} = rowValues[colId];


            return (<Row>
                {taskList.map((task, index) => {
                    return (
                        <Draggable draggableId={task.mfProps.ref} index={index}>
                            {(provided) => (
                                <TaskContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{task.mfProps.master_feature}</TaskContainer>
                            )}
                        </Draggable>
                    );
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
                <Droppable droppableId={`${Math.random()}`}>
                    {(provided)=>(
                    <RowContainer ref={provided.innerRef} {...provided.droppableProps}>
                        <RowId>{rowId}</RowId>
                        {rows}
                    </RowContainer >
                )}

                </Droppable>
            );
        });
    }

    console.dir(gridData);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <RowContainer >
                <Header>Initatives</Header>
                {renderColumnHeaders(gridData)}
            </RowContainer >
            {renderRows(gridData)}
        </DragDropContext>
    )
}
