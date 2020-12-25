import axiosRequest from 'axios'
import { API, BUILD_NUMBER } from 'utils/const'
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import defaults from 'utils/defaults'
import { remoteLogger } from 'utils/inform'
import { clearUserData } from 'helpers/user'
import Navigation from 'utils/navigation'
import { Fetch, Axios } from 'types/customAxios'

/**
 * Configured Headers.
 */
const headers = () => (
  {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${defaults.token}`,
    'Build-Number': BUILD_NUMBER,
    'App-Version': DeviceInfo.getVersion(),
    Device: Platform.OS,
    'Device-OS-Version': Platform.Version,
  }
)

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
          headers: headers(),
          params,
          method,
          data,
          url,
        },
      )
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          remoteLogger(error)
          if (error.response && error.response.status === 401) {
            clearUserData()
            Navigation.navigate('Home')
          }

          reject(error.response)
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
    const info = { uri, method: 'GET', ...headers() }
    console.groupCollapsed(`Service - ${uri}`)
    console.table(info)
    console.groupEnd()
    return fetch(uri, null, 'get', params)
  },

  post: (uri, payload) => {
    const info = {
      uri,
      method: 'POST',
      ...headers(),
    }

    console.groupCollapsed(`Service - ${uri}`)
    console.table(info)
    console.info({ payload })
    console.groupEnd()
    return fetch(uri, payload, 'post', {})
  },
}

export default axios
