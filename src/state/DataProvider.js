import React from 'react';
import Papa from 'papaparse';

export default class DataProvider extends React.Component{
    constructor(){
        super();
        this.data = [];
    }

    setData(data){
        this.data = data ;
    }

    getData(data){
        if(this.data){
            return data ;
        }
        //TODO: Raise Error if data is accessed before it is available.
    }

    async processCsvData(callback) {
        let csvData = await this.fetchCsv();

        Papa.parse(csvData, {
            complete: callback
        });
    }

    fetchCsv() {
        return fetch('/data/test-data.csv').then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');

            return reader.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    }

}