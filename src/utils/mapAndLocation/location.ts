import RNLocation from 'react-native-location'

const requestPermission = RNLocation.requestPermission({
  ios: 'always',
  android: {
    detail: 'fine',
    rationale: {
      title: 'ლოკაციაზე წვდომა',
      message: 'აპის გამოყენებისთვის საჭიროა ლოკაციის გააქტიურება',
      buttonPositive: 'დიახ',
      buttonNegative: 'არა',
    },
  },
})

const configure = RNLocation.configure({
  distanceFilter: 50, // Meters
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
  showsBackgroundLocationIndicator: true,
})

export default {
  configure,
  requestPermission,
}
