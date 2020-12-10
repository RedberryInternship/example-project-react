import axiosRequest from 'axios'
import { API } from 'utils/const'
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import Defaults from 'utils/defaults'
import Sentry from 'utils/sentry'
import { remoteLogger } from 'utils/inform'
import { clearUserData } from 'helpers/user'
import Navigation from 'utils/navigation'
import { Fetch, Axios } from 'types/customAxios'

/**
 * Configured Headers.
 */
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Authorization: `Bearer ${Defaults.token}`,
  'App-Custom-Version': '2.5',
  'App-Version': DeviceInfo.getVersion(),
  Device: Platform.OS,
  'Device-OS-Version': Platform.Version,
}

/**
 * Configurable axios request.
 */
const fetch: Fetch = (uri, data, method, params) => {
  const promise = new Promise(
    (
      resolve: (val: any) => void,
      reject: (val: Error) => void,
    ) => {
      const url = API + uri

      axiosRequest(
        {
          headers,
          method,
          data,
          url,
          params,
        },
      )
        .then((response) => {
          console.log(['Response', response])
          resolve(response.data)
        })
        .catch((error) => {
          remoteLogger(error)
          if (error.response && error.response.status === 401) {
            clearUserData()
            Navigation.navigate('Home')
          }

          reject(error.response)
          Sentry.withScope((scope) => {
            scope.setFingerprint([method, url, JSON.stringify(headers)])
            Sentry.captureException(error)
          })
        })
    },
  )
  return promise
}

/**
 * Custom axios wrapper.
 */
const axios: Axios = {
  get: (uri, params = {}) => {
    console.log([`Service | GET : ${uri}`])
    return fetch(uri, null, 'get', params)
  },

  post: (uri, payload) => {
    console.log([`Service | POST : ${uri}`])
    return fetch(uri, payload, 'post', {})
  },
}

export default axios
