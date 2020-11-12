import React from 'react';
import styled from 'styled-components';
import Util from '../common/Util';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

const RowContainer = styled.div`
display: flex;
flex-wrap: nowrap;
padding: 0 10px 0 10px;
`;

const Header = styled.div`
font-weight: 700;
font-size: 18px;
flex: 1 1 20%;
border: 1px solid black;
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

const c_name = 'Capacity Row';

export default function CapacityRow({planState, setPlanState}) {
    const {teamCapacitySummary} = planState

    const renderCapacityCell = (capacityObj, quarter) => {
        const m_name = 'renderCapacityCell';
        Util.logDebug(c_name, m_name, 'renderCapacityCell', capacityObj);

        const retVal = [];

        capacityObj.forEach((teamCapacity, key) => {
            const {
                team,
                netCapacity,
                pendingCapacity,
                totalEstimate
            } = teamCapacity;

            const teamNameArr = team.split('.')
            teamNameArr.shift();
            const teamNameFormatted = teamNameArr.reduce((acc, value) => {
                const [first, ...rest] = value;

                return acc += first.toUpperCase() + rest.join("") + " ";
            }, "").trim();
            const chipId = teamNameArr.reduce((acc, value) => {
                return acc += value[0].toUpperCase();
            }, "")

            retVal.push(
                <CapacityContainer key={key}>
                    <div>
                        <Tooltip title={teamNameFormatted}>
                            <Avatar sizes="small" style={{width: '18px', height: '18px', fontSize: '0.625rem', backgroundColor:'rgb(157 189 221)'}} >{chipId}</Avatar>
                        </Tooltip>
                        <Chip style={{borderColor:'rgb(157 189 221)'}} size="small" variant="outlined" label={`Available : ${netCapacity}`} color="primary"/>
                        <Chip style={{borderColor:'rgb(157 189 221)'}} size="small" variant="outlined" label={`Pending  : ${pendingCapacity}`} color="primary"/>
                        <Chip style={{borderColor:'rgb(157 189 221)'}} size="small" variant="outlined" label={`Total : ${totalEstimate}`} color="primary"/>
                     </div>
                </CapacityContainer>
            );
        });

        return retVal;
    }

    const renderCapacityRow = (teamCapacitySummary) => {
        const m_name = 'renderCapacityRow';

        Util.logDebug(c_name, m_name, 'renderCapacityRow:64', teamCapacitySummary);

        const retVal = []

        if (!teamCapacitySummary) {
            Util.logDebug(c_name, m_name, 'renderCapacityRow', 'returning back');
            return retVal;
        }

        teamCapacitySummary.forEach((capacityObj, key) =>{
            Util.logDebug(c_name, m_name, 'inside for each', capacityObj);
            retVal.push(<Row key={key}>{renderCapacityCell(capacityObj, key)}</Row>);
        });

        return retVal;
    }

    return (
        <RowContainer>
            <Header>Capacity Summary</Header>
            {renderCapacityRow(teamCapacitySummary)}
        </RowContainer>

    )
}
