import React , {useEffect} from 'react';
import styled from 'styled-components';

const RowContainer = styled.div`
display: flex;
flex-wrap: nowrap;
padding: 0 10px 0 10px;
`;
const Row = styled.div`
flex: 1 1 20%;
border: 1px solid black;
`;

const CapacityContainer = styled.div`
flex: 1 1 10px;
font-size: 14px;
border: 1px solid #d8e8f8;
`;

export default function CapacityRow({teamCapacitySummary}) {

    const renderCapacityCell = (capacityObj, quarter) => {
        const retVal = [];

        capacityObj.forEach((teamCapacity, key) => {
            const {
                availableCapacity,
                name,
                netCapacity,
                pendingCapacity,
                rtbCapacity,
                totalEstimate
            } = teamCapacity;

            const teamNameArr = name.split('.')
            teamNameArr.shift();
            const teamNameFormatted = teamNameArr.join(' ');

            retVal.push(
                <CapacityContainer key={key}>
                    <div>
                        <div>{teamNameFormatted}</div>
                        <div>Pending Capacity : {pendingCapacity}</div>
                        <div>Total Estimate : {totalEstimate}</div>
                     </div>
                </CapacityContainer>
            );
        });

        return retVal;
    }

    const renderCapacityRow = (teamCapacitySummary) => {
        const retVal = []

        if (!teamCapacitySummary) {
            return retVal;
        }

        teamCapacitySummary.forEach((capacityObj, key) =>{

            retVal.push(<Row key={key}>{renderCapacityCell(capacityObj, key)}</Row>);
        });

        return retVal;
    }

    return (
        <RowContainer>
            <Row>Capacity Summary</Row>
            {renderCapacityRow(teamCapacitySummary)}
        </RowContainer>

    )
}
