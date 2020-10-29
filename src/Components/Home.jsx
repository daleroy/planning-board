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
`;

const RowContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Row = styled.h1`
    flex: 1 1 160px;
`

const getGridData = () => {
  let dataProcessor = PlanGridDataProcessor.getProcessor() ;

  return Promise.all([
      dataProcessor.processTaskData(),
      dataProcessor.processTeamCapacityData()
  ]);
}

const renderRow = ({grid}) => {
    if (!grid) {
        return
    }
    const initiatives = Object.keys(grid);

    return initiatives.map((id) => {
        return (<ColumnContainer>{id}</ColumnContainer>);
    });
}

export default function TopToolBar() {
    const [gridData, setGridData] = React.useState({});
    useEffect(() => {
        getGridData().then(data => {
            setGridData(data[0])
        });
    }, []);

    const onDragEnd = result => { }


    console.dir(gridData);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <RowContainer >
                <Row>Initatives</Row>
                <Row>Q1</Row>
                <Row>Q2</Row>
                <Row>Q3</Row>
                <Row>Q4</Row>
            </RowContainer >
            <Container >
                    {renderRow(gridData)}
            </Container >

        </DragDropContext>
    )
}
