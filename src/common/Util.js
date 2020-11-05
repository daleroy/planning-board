export default class Util{
    static extractColumn = (array, column) => {return array.map(e=>e[column])};

    static adder = (a,b)=>{return a+b ;}
    static substractor = (a,b)=>{return a-b};
    static ignoreClassNames = {
        'PlanGridData':true,
        'PlanGridDataProcessor':true,
        'Home':false,
    }

    static removeItem = (array, itemId) =>{
        for(let i=0; i <array.length;++i){
            if (array[i].id === itemId){
                array.splice(i,1);
                return ;
            }
        }
    }

    static isIterable(obj) {
        // checks for null and undefined
        if (obj == null) {
          return false;
        }
        return typeof obj[Symbol.iterator] === 'function';
      }

    static isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    static isNotBlank(str){
        return !Util.isBlank(str);
    }

    static tableToTupleArray = (rows, header)=>{
        let tupleArray = [] ;
        for(let i =0 ; i < rows.length; ++ i){
            let row = rows[i] ;
            let rowDict = {};
            for(let colIndex=0 ; colIndex < header.length; ++ colIndex){
                let key = header[colIndex];
                let value = row[colIndex] ;
                rowDict[key] = value ;
            }
            tupleArray.push(rowDict);
        }
        return tupleArray ;
    };

    static log(desc){
        console.log(desc);
    }
    static logo(desc, myObject){
        console.log(`${desc} :%o: `,myObject);
    }

    static logTrace (className, methodName, desc, myObject){
        let prefix = className.concat(':')
                              .concat(methodName)
                              .concat(':')
                              .concat(desc);

        Util.logo(prefix, myObject);

    }

    static logDebug (className, methodName, desc, myObject){
        if(Util.ignoreClassNames[className]) return ;

        let prefix = className.concat(':')
                              .concat(methodName)
                              .concat(':')
                              .concat(desc);
        Util.logo(prefix, myObject);

    }
}
