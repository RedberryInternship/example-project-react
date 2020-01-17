import axios from 'axios';
import {API} from "./const";
import { Platform} from "react-native"
import DeviceInfo from 'react-native-device-info';
import Defaults from './defaults';
import AsyncStorage from '@react-native-community/async-storage';

type Method = "get" | "post"
type Error = {
    error : boolean,
    status : number
}
class Ajax {

    async headers() {
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : "*",
            "Authorization" : "Bearer " + Defaults.token,
            "App-Custom-Version" : "2.5",
            "App-Version" : await DeviceInfo.getVersion(),
            "Device" : Platform.OS,
            "Device-OS-Version" : Platform.Version
        }
    }

    get( uri : string) {
        return this._fetch(uri, null, "get");
    }
    post(uri : string, payload : any) {
        return this._fetch(uri, payload, "post");
    }
    private _fetch(uri :string, data : any, method : Method ) {
        const promise = new Promise(async (resolve : (val :any) =>void, reject : (val : Error ) =>void)  => {
            const headers = await this.headers();
            const url =API + uri ;
            this.logRequest(method, url, headers, data);
            axios({ method, url, headers, data }).then(response => {
                this.logResponse(method, url, headers, response.data);
                resolve(response.data)
            }).catch(error => {

                if( error.response && error.response.status === 401){
                    AsyncStorage.clear()
                }
                else 
                Defaults.dropdown && Defaults.dropdown.alertWithType('error',"შეცომა",'დაფიქსირდა შეცომა, გთხოვთ ცადოთ თავიდან');
                this.logResponse(method, url, headers, error);
                reject(error.response);
            });
        });
        return promise;
    }

    static getParams(payload : any, request : Boolean) {
        return payload ? '\n>>>>>>>>' + (request ? '>>>>>' : '<<<<<') + ' Body Param: ' + JSON.stringify(payload) : '';
    }

    logRequest(method : Method, url :string, headers :Object, payload : any = '') {
        console.log('>>>>>>>>>>>>>> Headers: ' + JSON.stringify(headers) + '\n' +
            '>>>>> ' + method + ">>" + url + 
            Ajax.getParams(payload, true) + '\n' +
            '>>>>>>>>>>>>>>>>');
    }

    logResponse(method :Method, url :string, headers : object, payload = '') {
        console.log(
            '<<<<<<<<<<<<<<<<\n' +
            '<<<<< Headers: ' + JSON.stringify(headers) + '\n' +
            '<<<<< ' + method + ' ' + url + '\n' +
            '<<<<< Status Code: ' + JSON.stringify(payload) + '\n'+
            '<<<<<<<<<<<<<<<<');
    }
}

export default new Ajax();