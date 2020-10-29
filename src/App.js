import './App.css';
import styled from 'styled-components';
import DataImporter from './DataImporter';
import PlanGridDataProcessor from './state/PlanGridDataProcessor';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
`;

const processData = (data) =>{
  console.log('In Process Data ');
  console.log(data);
}

const getGridData = () => {
  let dataProcessor = PlanGridDataProcessor.getProcessor() ;
  dataProcessor.processTaskData().then(data => processData(data));
  dataProcessor.processTeamCapacityData().then(data => processData);
}


export default function App() {
  getGridData();
  return (
    <Container>
      <DataImporter callback={processData}/>
    </Container>
  );
}
