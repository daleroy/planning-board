import React , { useState, useEffect} from 'react';
import {GridDataContext} from '../App';
import PlanGridDataProcessor from '../state/PlanGridDataProcessor';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    display: flex
`;

const ColumnContainer = styled.div`
    flex: 1
`;

const getGridData = () => {
  let dataProcessor = PlanGridDataProcessor.getProcessor() ;

  return Promise.all([
      dataProcessor.processTaskData(),
      dataProcessor.processTeamCapacityData()
  ]);
}

export default function TopToolBar() {
    const [gridData, setGridData] = React.useState();
    useEffect(() => {
        getGridData().then(data => {
            setGridData(data[0])
        });
    }, []);

    const onDragEnd = result => { }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container >
                <ColumnContainer>
                    <h1>Hello</h1>
                </ColumnContainer>
            </Container >
        </DragDropContext>
    )
}
