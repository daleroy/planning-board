import React , {useEffect, useState} from 'react';
import PlanGridDataProcessor from '../state/PlanGridDataProcessor';
import CapacityRow from './CapacityRow';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import GridView from './GridView'
import Util from '../ds/Util'

const TeamEstimate = styled.div`
font-size: 12px;
color: #485757;
`

const TaskContainer = styled.div`
flex: 1 1 10px;
background-color: #f0f8ff;
border: 1px solid #d8e8f8;
font-size: 14px;
`;

const RowContainer = styled.div`
display: flex;
flex-wrap: nowrap;
padding: 0 10px 0 10px;
`;

const RowId = styled.div`
font-weight: 700;
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

const EmptyDiv = styled.div`
    padding:20px ;
`;

const c_name = 'Home';

const getGridData = () => {
    let dataProcessor = PlanGridDataProcessor.getProcessor() ;
    return dataProcessor.process();
}

export default function Home() {
    const [gridData, setGridData] = React.useState({});
    const [taskRawData, setTaskRawData] = React.useState({});

    useEffect(() => {
        const m_name = 'useEffect';
        Util.logDebug(c_name, m_name, 'Inside..', gridData);
        getGridData().then(data => {
            const m_name = 'useEffect' ;
            window.gridData = data;
            setGridData(data);
            Util.logDebug(c_name, m_name, 'After data fetch', data.teamCapacitySummary);
            setTaskRawData(PlanGridDataProcessor.getProcessor().taskRawData.data);
        });
    },[]);

    const onDragEnd = result => {
        const {destination, source, draggableId} = result ;

        if (!destination || !source || !draggableId) {
            return
        }

        gridData.handleMove(draggableId, source.droppableId, destination.droppableId);
        setGridData(Object.assign({}, gridData))
    }

    const renderColumnHeaders = ({columnKeys}) => {
        if (!columnKeys) {
            return
        }

        return columnKeys.orderedValues.map((id, index) => {
            return (<Header key={index}>{id}</Header>);
        });
    }

    const renderRow = (rowValues) => {
        const columnKeys = Object.keys(rowValues);
        return columnKeys.map((colName) => {
            const {id, taskList} = rowValues[colName];


            return (
                <Droppable droppableId={id} key={id}>
                    {(provided)=>(

                        <Row ref={provided.innerRef} {...provided.droppableProps}>
                            {provided.placeholder}
                            {taskList.map((task, index) => {
                                return (
                                    <Draggable draggableId={task.id} index={index} key={task.id}>
                                        {(provided) => (
                                            <TaskContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={index}>
                                                <div>{task.mfProps.master_feature}</div>
                                                {Object.keys(task.teamEstimates).map((id, index) => {
                                                        return <TeamEstimate key={index}>{id} : {task.teamEstimates[id]}</TeamEstimate>
                                                })}

                                            </TaskContainer>
                                        )}
                                    </Draggable>
                                );
                            })}
                        </Row>
                    )}

                </Droppable>)
            })
        }

        const renderRows = ({rowKeys, grid}) => {
            if (!rowKeys) {
                return
            }

            return rowKeys.orderedValues.map((rowId, index) => {
                const rowValues = grid[rowId];
                const rows = renderRow(rowValues);
                return (
                    <RowContainer key={index}>
                        <RowId>{rowId}</RowId>
                        {rows}
                    </RowContainer >
                );
            });
        }

        // console.dir(gridData);
        Util.logDebug(c_name, 'Render', 'Grid Data', gridData);
        Util.logDebug(c_name, 'Render', 'task raw data ', taskRawData);
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={onDragEnd}>
                    <RowContainer >
                        <Header>Initatives</Header>
                        {renderColumnHeaders(gridData)}
                    </RowContainer >
                    {renderRows(gridData)}
                </DragDropContext>
                <CapacityRow teamCapacitySummary={gridData.teamCapacitySummary}/>
                <EmptyDiv/>
                <GridView csvValues = {taskRawData} ></GridView>
            </React.Fragment>
        )
    }
