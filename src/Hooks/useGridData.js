import React , {useEffect, useState} from 'react';
import PlanGridDataProcessor from '../state/StateInitializer';
import Util from '../common/Util'
import LoaderFactory from '../state/loader/LoaderFactory';
import * as constants from '../common/Constants';


const c_name = 'useGridData';

const useGridData = () => {
    const [gridData, setGridData] = React.useState({columnKeys: {orderedValues: []}, rowKeys: {orderedValues: []}});

    const getGridData = () => {
        let dataProcessor = PlanGridDataProcessor.testProcessor() ;
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
