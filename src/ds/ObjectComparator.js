export default class StringComparator{
    compare(item1, item2){
        if (item1 < item2) return -1 ;
        if (item1 === item2) return 0 ;
        if(item1> item2) return 1 ;
    }
}