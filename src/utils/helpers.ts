import {Sentry} from 'utils'
import {Exception} from '@sentry/react-native'

const Logger = (err: Exception | string | number): void => {
  if (__DEV__) {
    Sentry.captureException(err)
  } else {
    console.log(['Logger', err])
  }
}

export default {Logger}
