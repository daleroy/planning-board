import { v4 as uuidv4 } from 'uuid';


export default class Task{
    constructor(mfProps, teamEstimates){
        this.id = uuidv4();
        // this.name = mfProps["master_feature"];
        this.mfProps = mfProps ;
        this.teamEstimates = teamEstimates;
    }
}