import React , { useState } from 'react';
import PlanGridDataProcessor from '../state/PlanGridDataProcessor';

const processData = (data) =>{
  console.log('In Process Data ');
  console.log(data);
}

const getGridData = () => {
  let dataProcessor = PlanGridDataProcessor.getProcessor() ;

  return Promise.all([
      dataProcessor.processTaskData(),
      dataProcessor.processTeamCapacityData()
  ]);
}

export default function TopToolBar() {
    getGridData().then(data => processData(data));

    return (
        <div>HOME</div>
    )
}
