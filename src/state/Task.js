import { v4 as uuidv4 } from 'uuid';


export default class Task{
    constructor(mfProps, teamEstimate){
        this.id = uuidv4();
        this.name = mfProps["master_feature"];
        this.mfProps = mfProps ;
        this.teamEstimate = teamEstimate;
    }

    toString(){
        let str = " " ;
        for (const [key, value] of Object.entries(this.mfProps)){
                str = str.concat("key=")
                         .concat(key)
                         .concat("value=")
                         .concat(value)
                         .concat("\n");
        }

        for (const [key, value] of Object.entries(this.teamEstimate)){
            str = str.concat("key=")
                     .concat(key)
                     .concat("value=")
                     .concat(value)
                     .concat("\n");
        }
    }
}