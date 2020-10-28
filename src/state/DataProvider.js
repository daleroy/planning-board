import React from 'react';
import Papa from 'papaparse';

export default class DataProvider extends React.Component{
    constructor(url){
        super(url);
        this.url = url;
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
        return fetch(this.url).then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');

            return reader.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    }

    static getTasksProvider(){
        return new DataProvider('/data/test-data.csv');
    }

    static getTeamCapacityProvider(){
        return new DataProvider('/data/team-capacity.csv');
    }

}