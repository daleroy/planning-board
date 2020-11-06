import Util from '../common/Util';
import Table from '../ds/Table';
import NewPlanState from './NewPlanState';

const taskCsvValues = 
[['rank','ref','master_feature','initiative','period','team.authn.web','team.authn.fe','team.authn.mobile'],
['224','IDENTITY-E-2509','Progressive','Enhanced account management experiences','Q1','10','3','3'],
['300','IDENTITY-E-2420','AuthZ to AuthN integration Support - placeholder AAL-20','Other Tech','Q2','5','7','6'],
['929','IDENTITY-E-2483','5. Enable Expert login through SSO on Native Mobile Apps+-','Enable expert onboarding','Q3','3','','4'],
['901','IDENTITY-E-2413','Capability: Compliance to new Security Policy & Development for Account Recovery Enhancements','Other Tech','Q4','3','5',''],
['904','IDENTITY-E-1968','Experiment: Enable BUs with Increased Verified Phone User base in SBSEG & CG (Non-Tax)','FY21 IIP Account Abuse Reduction','Q1','10','',''],
['976','IDENTITY-E-2207','RSS: Visitor ID Support for Customer 360/Auth Passive Factor','FY21 IIP Account Abuse Reduction','Q2','','10',''],
['903','IDENTITY-E-2411','Build WebAuthN Backend Capability','New Auth Factors','Q3','','','10'],
['906','IDENTITY-E-2103','Flexible Security AuthN Backend Q1 Scope (TB 2.IG 8)','Flexibile MFA Framework','Q4','','','10'],
['907','IDENTITY-E-2104','Flexible Security AuthN Web Q1 Scope (TB 2.IG 8)','Flexibile MFA Framework','Q1','','20','']];

const teamCsvValues = [
    ['team','available_capacity','rtb'],
    ['team.authn.web',40,20],
    ['team.authn.fe',45,15],
    ['team.authn.mobile',75,15],
]; 

test('Validate Test Data', () => {
    let props = {tabularData:taskCsvValues};                
    let table = new Table(props);
    expect(table.header.length).toBe(8);
  });

  test('Validate New Plan State ', () => {
    let planState = NewPlanState.fromCsvValues(teamCsvValues, taskCsvValues, 'initiative', 'period');
    let teamSummaryRow = planState.getTeamCapacitySummary().get("Q1").get("team.authn.web");
    
    expect(teamSummaryRow.totalEstimate).toBe(20);
    expect(teamSummaryRow.pendingCapacity).toBe(0);
  });

  test('New Plan State Move', () =>{
    let planState = NewPlanState.fromCsvValues(teamCsvValues, taskCsvValues, 'initiative', 'period');
    let viewModel = planState.pivotView().viewModel;
    let idToKeysMap = planState.pivotView().idToKeysMap;
    let pivot

    // Util.logDebug('New Plan State Test', 'Test Move', 'view Model', idToKeysMap);

    let testInitiative = 'Enhanced account management experiences' ;
    let fromPeriod = "Q1";
    let toPeriod = "Q2";
    
    let fromCell = viewModel[testInitiative][fromPeriod] ;
    let toCell   = viewModel[testInitiative][toPeriod];
    let fromRowList = fromCell.rowList ;
    let fromCellId = fromCell.id ;
    let toCellId = toCell.id ;

    let taskList = fromRowList.filter(item => {
        return item["ref"] === "IDENTITY-E-2509";
    });

    let task = taskList[0] ;
    let idToMove = task.id ;

    // Util.logDebug('New Plan State Test', 'Test Move', 'keyForCell', planState.taskTable.keyForCellId(fromCellId));

    planState.handleMove(idToMove, fromCellId, toCellId);
    expect(task.period).toBe('Q2');

    fromCell = viewModel[testInitiative][fromPeriod] ;
    toCell   = viewModel[testInitiative][toPeriod];
    fromRowList = fromCell.rowList ;
    let toRowList = toCell.rowList ;

    let lookUpTaskFromCell = fromRowList.filter(item => {
        return item["ref"] === "IDENTITY-E-2509";
    });

    expect(lookUpTaskFromCell).toHaveLength(0);

    let lookUpTaskFromToCell = toRowList.filter(item => {
        return item["ref"] === "IDENTITY-E-2509";
    });

    expect(lookUpTaskFromToCell).toHaveLength(1);

  });