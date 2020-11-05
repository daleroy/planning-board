import PlanState from './PlanState'

test('initialize', () => {
    let planState = new PlanState();
    let rowValues =['a', 'a', 'b','c'];
    let columnValues = ['Q1', 'Q2', 'Q1', 'Q3'];
    planState.initialize(rowValues, columnValues);
    expect(planState.rowKeys.length()).toBe(3);
    expect(planState.columnKeys.length()).toBe(3);
    expect(planState.orderedRowKeys()[0]).toBe('a');
    expect(planState.orderedRowKeys()[1]).toBe('b');
    expect(planState.orderedRowKeys()[2]).toBe('c');
    expect(planState.orderedColumnKeys()[0]).toBe('Q1');
    expect(planState.orderedColumnKeys()[1]).toBe('Q2');
    expect(planState.orderedColumnKeys()[2]).toBe('Q3');
  });