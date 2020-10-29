export default class Util{
    static extractColumn = (array, column) => {return array.map(e=>e[column])};
}