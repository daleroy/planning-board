import Util from './Util'

test('unique values', () => {
    let twoDimArray = [ [1,2,3],
                    [4,5,6],
                    [7,8,9]
                  ];
    let secondCol = Util.extractColumn(twoDimArray,1);
    expect(secondCol.length).toBe(3);
    expect(secondCol[0]).toBe(2);
    expect(secondCol[1]).toBe(5);
    expect(secondCol[2]).toBe(8);
  });

  test('Table to Json ',()=>{
    let header = ['ab', 'bc', 'de.rg'];
    let rows =[[1,2,3], 
               [4,5,6] 
              ];
    let jsonStuff = Util.tableToTupleArray(rows, header);
    // console.log(jsonStuff);
    expect(jsonStuff[0]['ab']).toBe(1);
    expect(jsonStuff[0]['de.rg']).toBe(3);

  });

  test('Short id',()=>{
    expect(Util.id().length).toBeLessThan(10);
  });