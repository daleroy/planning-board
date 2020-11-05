import { URL_LOADER } from '../../common/Constants';
import UrlLoader from './UrlLoader';

export default class LoaderFactory {
    static INSTANCE ;

    constructor(){
        this.keyToLoaderMap = new Map();
        this.keyToLoaderMap.set(URL_LOADER, new UrlLoader());
    }

    get = (key)=> {
        return this.keyToLoaderMap.get(key);
    }

    static instance(){
        if(!LoaderFactory.INSTANCE){
            LoaderFactory.INSTANCE = new LoaderFactory();
        }
        return LoaderFactory.INSTANCE ;
    }

}
