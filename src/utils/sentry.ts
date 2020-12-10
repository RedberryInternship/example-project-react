import * as Sentry from '@sentry/react-native'

Sentry.init(
  {
    dsn: 'https://5e553025d2f54d69a6dca90c51af95a0@sentry.io/2970574',
    maxBreadcrumbs: 100,
    debug: __DEV__,
    attachStacktrace: true,
  },
)

export default Sentry
