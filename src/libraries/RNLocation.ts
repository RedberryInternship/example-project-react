import RNLocation from 'react-native-location'

/**
 * Configure react native location.
 */
RNLocation.configure({
  distanceFilter: undefined, /** Meters */
  desiredAccuracy: {
    ios: 'best',
    android: 'balancedPowerAccuracy',
  },

  /** Android Only */
  androidProvider: 'auto',
  interval: 5000, /** Milliseconds */
  fastestInterval: 10000, /** Milliseconds */
  maxWaitTime: 5000, /** Milliseconds */

  /** IOS Only */
  activityType: 'automotiveNavigation',
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, /** Degrees */
  headingOrientation: 'portrait',
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
})
