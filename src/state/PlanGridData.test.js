import PlanGridData from './PlanGridData'

test('initialize', () => {
    let planGridData = new PlanGridData();
    let rowValues =['a', 'a', 'b','c'];
    let columnValues = ['Q1', 'Q2', 'Q1', 'Q3'];
    planGridData.initialize(rowValues, columnValues);
    expect(planGridData.rowKeys.length()).toBe(3);
    expect(planGridData.columnKeys.length()).toBe(3);
    expect(planGridData.orderedRowKeys()[0]).toBe('a');
    expect(planGridData.orderedRowKeys()[1]).toBe('b');
    expect(planGridData.orderedRowKeys()[2]).toBe('c');
    expect(planGridData.orderedColumnKeys()[0]).toBe('Q1');
    expect(planGridData.orderedColumnKeys()[1]).toBe('Q2');
    expect(planGridData.orderedColumnKeys()[2]).toBe('Q3');
  });