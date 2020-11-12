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



export default function Home({planState, setPlanState}) {

    const onDragEnd = result => {
        const {destination, source, draggableId} = result ;

        if (!destination || !source || !draggableId) {
            return
        }

        console.log(`***** SAME PLAN STATE: ${planState === window.planState}`)
        const newPlanState = planState.handleMove(draggableId, source.droppableId, destination.droppableId);
        setPlanState({...newPlanState});
    }

    const renderColumnHeaders = ({colKeys}) => {

        return colKeys.map((id, index) => {
            return (<Header key={index}>{id}</Header>);
        });
    }

    const renderCell = (rowValues) => {
        const columnKeys = Object.keys(rowValues);
        return columnKeys.map((colName) => {
            const {id, rowList} = rowValues[colName];


            return (
                <Droppable droppableId={id} key={id}>
                    {(provided)=>(

                        <Row ref={provided.innerRef} {...provided.droppableProps}>
                            {provided.placeholder}
                            {rowList.map((task, index) => {
                                return <Card key={index} task={task} index={index} provided={provided}/>
                            })}
                        </Row>
                    )}

                </Droppable>)
            })
        }

        const renderRows = ({rowKeys, viewModel}) => {
            return rowKeys.map((rowId, index) => {
                const rowValues = viewModel[rowId];
                const cells = renderCell(rowValues);
                return (
                    <RowContainer key={index}>
                        <RowId>{rowId}</RowId>
                        {cells}
                    </RowContainer >
                );
            });
        }

        // console.dir(planState);
        Util.logDebug(c_name, 'Render', 'Grid Data', planState);
        // Util.logDebug(c_name, 'Render', 'task raw data ', taskRawData);
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={onDragEnd}>
                    <RowContainer >
                        <Header>Initatives</Header>
                        {renderColumnHeaders(planState.taskTable.pivot)}
                    </RowContainer >
                    {renderRows(planState.taskTable.pivot)}
                </DragDropContext>
                <EmptyDiv/>
                <CapacityRow
                    planState={planState}
                    setPlanState={setPlanState}
                />

            </React.Fragment>
        )
    }
