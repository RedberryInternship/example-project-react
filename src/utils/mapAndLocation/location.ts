import RNLocation from 'react-native-location'
import {Platform, PermissionsAndroid} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'

const requestPermission = async (): Promise<boolean> => {
  if (Platform.OS == 'ios') {
    Geolocation.requestAuthorization()
    return true
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'we need GPS location service',
          message: 'we need location service to provide your location',
          // buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          })
          return true
        } catch (error) {
          return false
        }
      } else {
        //render modal
        return false
      }
    } catch (err) {
      console.warn(err)
      //render modal
      return false
    }
  }
}

const configure = RNLocation.configure.bind(this, {
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
