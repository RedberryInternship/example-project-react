import RNLocation from 'react-native-location'

const requestPermission = async (): Promise<boolean> => {
  const res = await RNLocation.requestPermission({
    ios: 'always',
    android: {
      detail: 'fine',
    },
  })

  return res
}

RNLocation.configure({
  distanceFilter: undefined, // Meters
  desiredAccuracy: {
    ios: 'best',
    android: 'balancedPowerAccuracy',
  },
  // Android only
  androidProvider: 'auto',
  interval: 5000, // Milliseconds
  fastestInterval: 10000, // Milliseconds
  maxWaitTime: 5000, // Milliseconds
  // iOS Only
  activityType: 'automotiveNavigation',
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: 'portrait',
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
})

export default {
  requestPermission,
}
