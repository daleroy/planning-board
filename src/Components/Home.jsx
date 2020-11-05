import React from 'react';
import CapacityRow from './CapacityRow';
import Card from './Card';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import Util from '../common/Util'

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



export default function Home({gridData, setGridData}) {

    const onDragEnd = result => {
        const {destination, source, draggableId} = result ;

        if (!destination || !source || !draggableId) {
            return
        }

        gridData.handleMove(draggableId, source.droppableId, destination.droppableId);
        setGridData(Object.assign({}, gridData))
    }

    const renderColumnHeaders = ({columnKeys}) => {

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
                                return <Card task={task} index={index} provided={provided}/>
                            })}
                        </Row>
                    )}

                </Droppable>)
            })
        }

        const renderRows = ({rowKeys, grid}) => {

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
        // Util.logDebug(c_name, 'Render', 'task raw data ', taskRawData);
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={onDragEnd}>
                    <RowContainer >
                        <Header>Initatives</Header>
                        {renderColumnHeaders(gridData)}
                    </RowContainer >
                    {renderRows(gridData)}
                </DragDropContext>
                <EmptyDiv/>
                    <CapacityRow
                        gridData={gridData}
                        setGridData={setGridData}
                        />
            </React.Fragment>
        )
    }
