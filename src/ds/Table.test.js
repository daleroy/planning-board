import Table from './Table';

test('Table Pivot', () => {
    let csvValues = [['theme', 'period', 'estimate'],
                     ['A', 'Q1', '100'],
                     ['A', 'Q1', '200'],
                     ['B', 'Q2', '200'],
                     ['B', 'Q2', '200'],
                    ];
    let props = {tabularData:csvValues};                

    let table = new Table(props);
    expect(table.header.length).toBe(3);
    let pivot = table.pivot('theme', 'period');
    let aq1 = pivot['A']['Q1'].rowList;
    expect(aq1.length).toBe(2);
    let aq2 = pivot['A']['Q2'].rowList;
    expect(aq2.length).toBe(0);
  });

  test('Table Get Set for Key', () => {
    let csvValues = [['theme', 'period', 'estimate'],
                     ['A', 'Q1', '100'],
                     ['A', 'Q1', '200'],
                     ['B', 'Q2', '200'],
                     ['B', 'Q2', '200'],
                    ];
    let props = {tabularData:csvValues};                

    let table = new Table(props);
    let set = table.getSetForKey('theme');
    expect(set.orderedValues.length).toBe(2);
    expect(set.orderedValues.includes('A')).toBe(true);
    expect(set.orderedValues.includes('B')).toBe(true);
    
  });