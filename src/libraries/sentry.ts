import { init } from '@sentry/react-native'
import { getVersion, getBuildNumber } from 'react-native-device-info'

// eslint-disable-next-line no-underscore-dangle
declare const __DEV__: boolean

const version = `ge.e-space.api-${getVersion()}`
const buildNumber = getBuildNumber()

console.table(
  {
    APP_VERSION: version,
    APP_BUILD_NUMBER: buildNumber,
  },
)

if (!__DEV__) {
  init(
    {
      dsn: 'https://5e553025d2f54d69a6dca90c51af95a0@sentry.io/2970574',
      release: version,
      dist: buildNumber,
      maxBreadcrumbs: 100,
      environment: 'production',
      attachStacktrace: true,
      enableAutoSessionTracking: true,
      sendDefaultPii: true,
      tracesSampleRate: 1.0,
    },
  )
}
