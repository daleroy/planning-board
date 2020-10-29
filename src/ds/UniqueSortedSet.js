import ObjectComparator from "./ObjectComparator";

export default class UniqueSortedSet {
    constructor(comparator){
        if(comparator){
            this.comparator = comparator ;
        }else{
            this.comparator = new ObjectComparator();
        }
        
        this.valueSet = new Map() ;
        this.orderedValues =[];
    }

    insert = (item)=>{
        for (let i = 0; i < this.orderedValues.length; i++) {
            let ithValue = this.orderedValues[i];
            if(this.comparator.compare(item, ithValue) <=0){
                // item is less than ithValue ; TODO: could solve for efficiency
                this.orderedValues.splice(i, 0,item);
                return ;
            }
        }
        this.orderedValues.push(item);  
    }

    add(item){
        if(this.valueSet.has(item)) return ;
        this.valueSet.set(item, true);
        this.insert(item);
    }

    length(){
        return this.orderedValues.length
    }
}