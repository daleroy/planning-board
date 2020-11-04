import React , {useEffect, useState} from 'react';
import PlanGridDataProcessor from '../state/PlanGridDataProcessor';
import Util from '../ds/Util'

const c_name = 'useGridData';

const useGridData = () => {
    const [gridData, setGridData] = React.useState({columnKeys: {orderedValues: []}, rowKeys: {orderedValues: []}});

    const getGridData = () => {
        let dataProcessor = PlanGridDataProcessor.getProcessor() ;
        return dataProcessor.process();
    }

    useEffect(() => {
        const m_name = 'useEffect';
        Util.logDebug(c_name, m_name, 'Inside..', gridData);
        getGridData().then(data => {
            const m_name = 'useEffect' ;
            window.gridData = data;
            setGridData(data);
            Util.logDebug(c_name, m_name, 'After data fetch', data.teamCapacitySummary);
            // setTaskRawData(PlanGridDataProcessor.getProcessor().taskRawData.data);
        });
    },[]);

  return {gridData, setGridData};
};
export default useGridData;
