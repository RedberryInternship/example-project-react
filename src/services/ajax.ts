import axios from 'axios'
import {API} from 'utils/const'
import {Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {Defaults, Sentry} from 'utils'
import AsyncStorage from '@react-native-community/async-storage'

type Method = 'get' | 'post'
type Error = {
  error: boolean
  status: number
}
class Ajax {
  headers(): Record<string, string | number> {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + Defaults.token,
      'App-Custom-Version': '2.5',
      'App-Version': DeviceInfo.getVersion(),
      Device: Platform.OS,
      'Device-OS-Version': Platform.Version,
    }
  }

  get(uri: string): Promise<any> {
    return this._fetch(uri, null, 'get')
  }
  post(uri: string, payload: any): Promise<any> {
    return this._fetch(uri, payload, 'post')
  }
  private _fetch(uri: string, data: any, method: Method): Promise<any> {
    const promise = new Promise(
      (resolve: (val: any) => void, reject: (val: Error) => void) => {
        const headers = this.headers()
        const url = API + uri
        this.logRequest(method, url, headers, data)
        axios({method, url, headers, data})
          .then((response) => {
            this.logResponse(method, url, headers, response.data)
            resolve(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              AsyncStorage.clear()
            }
            // Defaults.dropdown && Defaults.dropdown?.alertWithType('error',"შეცომა",'დაფიქსირდა შეცომა, გთხოვთ ცადოთ თავიდან');
            else this.logResponse(method, url, headers, error.response)
            reject(error.response)
            Sentry.withScope(function(scope) {
              scope.setFingerprint([method, url, JSON.stringify(headers)])
              Sentry.captureException(error)
            })
          })
      },
    )
    return promise
  }

  static getParams(payload: any, request: boolean): string {
    return payload
      ? '\n>>>>>>>>' +
          (request ? '>>>>>' : '<<<<<') +
          ' Body Param: ' +
          JSON.stringify(payload)
      : ''
  }

  logRequest(
    method: Method,
    url: string,
    headers: Record<string, any>,
    payload: any = '',
  ): void {
    console.log(
      '>>>>>>>>>>>>>> Headers: ' +
        JSON.stringify(headers) +
        '\n' +
        '>>>>> ' +
        method +
        '>>' +
        url +
        Ajax.getParams(payload, true) +
        '\n' +
        '>>>>>>>>>>>>>>>>',
    )
  }

  logResponse(
    method: Method,
    url: string,
    headers: object,
    payload = '',
  ): void {
    console.log(
      '<<<<<<<<<<<<<<<<\n' +
        '<<<<< Headers: ' +
        JSON.stringify(headers) +
        '\n' +
        '<<<<< ' +
        method +
        ' ' +
        url +
        '\n' +
        '<<<<< Status Code: ' +
        JSON.stringify(payload) +
        '\n' +
        '<<<<<<<<<<<<<<<<',
    )
  }
}
export default new Ajax()
