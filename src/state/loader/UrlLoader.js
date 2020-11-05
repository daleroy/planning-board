import Papa from 'papaparse';

export default class UrlLoader{
    constructor(url){
    }

    async load(prop, callback){
        let url = prop.url ;
        console.log("url =" + url);
        let csvData = await this.fetchCsv(url);

        Papa.parse(csvData, {
            complete: callback
        });
    }

    fetchCsv(url) {
        return fetch(url).then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');

            return reader.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    }

    static getTasksProvider(){
        return new UrlLoader('/data/test-data.csv');
    }

    static getTeamCapacityProvider(){
        return new UrlLoader('/data/team-capacity.csv');
    }

}