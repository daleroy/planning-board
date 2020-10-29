export default class Util{
    static extractColumn = (array, column) => {return array.map(e=>e[column])};

    static adder = (a,b)=>{return a+b ;}
    static substractor = (a,b)=>{return a-b};

    static removeItem = (array, itemId) =>{
        for(let i=0; i <array.length;++i){
            if (array[i].id === itemId){
                array.splice(i,1);
                return ;
            }
        }
    }

    static isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    static isNotBlank(str){
        return !Util.isBlank(str);
    }

    static log(desc){
        console.log(desc);
    }
    static logo(desc, object){
        console.log(desc + ":%o:"+ " ",object);
    }
}