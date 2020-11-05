import UrlLoader from './UrlLoader'

test('Load Simple File', () => {
    let loader = new UrlLoader();
    let testUrl = 'https://raw.githubusercontent.com/daleroy/planning-board/master/public/data/team-capacity.csv';
    let prop = {url:testUrl}
    loader.load(prop).then((data)=>{
        try{
            console.log(data);
            // done();
        }catch (error){
            console.log(error);
            // done(error);
        }
    })
  });
