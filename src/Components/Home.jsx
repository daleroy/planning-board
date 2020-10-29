import React , {useEffect} from 'react';
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
            window.gridData = data;
            setGridData(data)
        });
    }, []);

    const onDragEnd = result => {
        const {destination, source, draggableId} = result ;

        if (!destination || !source || !draggableId) {
            return
        }

        gridData.handleMove(draggableId, source.droppableId, destination.droppableId);
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
                                            <TaskContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={index}>{task.mfProps.master_feature}</TaskContainer>
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
