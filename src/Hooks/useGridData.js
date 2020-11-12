import React , {useEffect} from 'react';
import PlanGridDataProcessor from '../state/StateInitializer';
import NewPlanState from '../state/NewPlanState';
import Util from '../common/Util'


const c_name = 'useGridData';

const useGridData = () => {
    const [planState, setPlanState] = React.useState({taskTable: {pivot: {colKeys: [], rowKeys: []}}});

    const initPlanState = () => {
        let dataProcessor = PlanGridDataProcessor.testProcessor() ;
        return dataProcessor.process();
    }

    useEffect(() => {
        const m_name = 'useEffect';
        Util.logDebug(c_name, m_name, 'Inside..', planState);
        initPlanState().then(({taskRawData, teamRawData} )=> {
            const m_name = 'useEffect' ;
            const planState = NewPlanState.fromCsvValues(teamRawData, taskRawData, 'initiative', 'period');
            window.planState = planState
            setPlanState(planState);
            Util.logDebug(c_name, m_name, 'After data fetch', planState.teamCapacitySummary);
            // setTaskRawData(PlanGridDataProcessor.getProcessor().taskRawData.data);
        });
    },[]);

  return {planState, setPlanState};
};
export default useGridData;
