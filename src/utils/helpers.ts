import {Sentry} from 'utils'
import {Exception} from '@sentry/react-native'
import {env} from '../../env'

const Logger = (err: Exception): void => {
  if (env === 'production') {
    Sentry.captureException(err)
  } else {
    console.log(['Logger', err])
  }
}

export default {Logger}
