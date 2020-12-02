import axios from 'axios'
import { API } from 'utils/const'
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import Defaults from 'utils/defaults'
import Sentry from 'utils/sentry'
import { remoteLogger } from 'helpers/inform'
import { clearUserData } from 'helpers/user'
import NavigationActions from 'utils/navigation.service'


class Ajax {
  headers(): Record<string, string | number> {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${Defaults.token}`,
      'App-Custom-Version': '2.5',
      'App-Version': DeviceInfo.getVersion(),
      Device: Platform.OS,
      'Device-OS-Version': Platform.Version,
    }
  }

  get(uri: string, params: object = {}): Promise<any> {
    console.log([`Service | GET : ${uri}`])
    return this.fetch(uri, null, 'get', params)
  }

  post(uri: string, payload: any): Promise<any> {
    console.log([`Service | POST : ${uri}`])
    return this.fetch(uri, payload, 'post', {})
  }

  private fetch(uri: string, data: any, method: Method, params: any) {
    const promise = new Promise(
      (
        resolve: (val: any) => void,
        reject: (val: Error) => void,
      ) => {
        const headers = this.headers()
        const url = API + uri

        axios(
          {
            headers,
            method,
            params,
            data,
            url,
          }
        )
          .then(response => resolve(response.data))
          .catch((error) => {
            remoteLogger(error)
            if (error.response && error.response.status === 401) {
              clearUserData()
              NavigationActions.navigate('Home')
            }

            reject(error.response)
            Sentry.withScope((scope) => {
              scope.setFingerprint([method, url, JSON.stringify(headers)])
              Sentry.captureException(error)
            })
          })
      })
    return promise
  }
}

export default new Ajax()

type Method = 'get' | 'post'

type Error = {
  error: boolean
  status: number
}