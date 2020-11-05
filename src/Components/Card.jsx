import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

const TaskContainer = styled.div`
flex: 1 1 10px;
background-color: #f0f8ff;
border: 1px solid #d8e8f8;
font-size: 14px;
width: 90%;
margin: 8px;
border-radius: 10px;
text-align: center;

    :hover {
        background-color: #d8e8f8;
        border: 1px solid #f0f8ff;
    }
`;

const TeamEstimate = styled.div`
font-size: 12px;
color: #485757;
text-align: left;
`
export default function Card({task, index, provided}) {

    return (
        <Draggable draggableId={task.id} index={index} key={task.id}>
            {(provided) => (
                <TaskContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={index}>
                    <div>{task.mfProps.master_feature}</div>
                    {Object.keys(task.teamEstimates).map((id, index) => {
                        const teamNameArr = id.split('.')
                        teamNameArr.shift();
                        const teamNameFormatted = teamNameArr.reduce((acc, value) => {
                            const [first, ...rest] = value;

                            return acc += first.toUpperCase() + rest.join("") + " ";
                        }, "").trim();
                        const chipId = teamNameArr.reduce((acc, value) => {
                            return acc += value[0].toUpperCase();
                        }, "")

                            return (
                                <TeamEstimate key={index}>
                                    <Tooltip title={teamNameFormatted}>
                                        <Chip style={{borderColor:'rgb(157 189 221)'}} size="small" variant="outlined" label={task.teamEstimates[id]} avatar={<Avatar style={{backgroundColor:'rgb(157 189 221)'}} >{chipId}</Avatar>} color="primary"/>
                                    </Tooltip>
                                </TeamEstimate>)
                    })}

                </TaskContainer>
            )}
        </Draggable>
    );
};
