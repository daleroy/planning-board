import PlanGridDataProcessor from './PlanGridDataProcessor'

test('process', done =>{
    PlanGridDataProcessor.getProcessor().process().then(done());
});