import axios from 'axios'
import {API} from './const'
import {Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {Defaults, Helpers} from 'utils'
import AsyncStorage from '@react-native-community/async-storage'

type Method = 'get' | 'post'
type Error = {
  error: boolean
  status: number
}
class Ajax {
  headers() {
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

  get(uri: string) {
    return this._fetch(uri, null, 'get')
  }
  post(uri: string, payload: any) {
    return this._fetch(uri, payload, 'post')
  }
  private _fetch(uri: string, data: any, method: Method) {
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
              Helpers.DisplayDropdownWithError()
            } else if (error.response && error.response.status === 400) {
              Helpers.DisplayDropdownWithError()
            } else if (error.response && error.response.status === 404) {
              Helpers.DisplayDropdownWithError()
            } else if (error.response && error.response.status === 422) {
              Helpers.DisplayDropdownWithError('validation error')
            }
            // Defaults.dropdown && Defaults.dropdown?.alertWithType('error',"შეცომა",'დაფიქსირდა შეცომა, გთხოვთ ცადოთ თავიდან');
            this.logResponse(method, url, headers, error.response)
            reject(error.response)
          })
      },
    )
    return promise
  }

  static getParams(payload: any, request: boolean) {
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
  ) {
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

  logResponse(method: Method, url: string, headers: object, payload = '') {
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

//Vobi Todo:
// import axios from 'axios'

// import config from 'config'

// class Api {
//     private readonly url: string

//     constructor(path: string) {
//       this.url = `${config.API_URL}${path}`
//     }

//     get(endpoint: string, params: any = {}) {
//       const url = this.url + endpoint
//       return axios.get(url, { params })
//     }

//     post(endpoint: string, body: any) {
//       const url = this.url + endpoint
//       return axios.post(url, body)
//     }

//     put(endpoint: string, body: any) {
//       const url = this.url + endpoint
//       return axios.put(url, body)
//     }

//     delete(endpoint: string, params: any) {
//       const url = this.url + endpoint
//       return axios.delete(url, params)
//     }
// }

// export default Api

// Vobi Todo:
// and usage is simpler we will create an service for every module for example user
// services/userApi.js
// const api = new Api('user')

// const createUser = (body) => api.post('/', body)
// const getUser = () => api.get('/')

// inside signUp for example we will import user api
// and on submit we will do api.createUser(values)

export default new Ajax()
