import RNLocation from 'react-native-location';
import { Alert } from 'react-native';
import Defaults  from '../defaults';


const requestPermission = RNLocation.requestPermission({
  ios: "always",
  android: {
    detail: "coarse",
    rationale: {
        title: "ლოკაციაზე წვდომა",
        message: "აპის გამოყენებისთვის საჭიროა ლოკაციის გააქტიურება",
        buttonPositive: "დიახ",
        buttonNegative: "არა"
    }
  }
}).then(granted => {
    if (granted) {
      // RNLocation.subscribeToLocationUpdates(locations => {
      //   /* Example location returned
      //   {
      //     speed: -1,
      //     longitude: -0.1337,
      //     latitude: 51.50998,
      //     accuracy: 5,
      //     heading: -1,
      //     altitude: 0,
      //     altitudeAccuracy: -1
      //     floor: 0
      //     timestamp: 1446007304457.029,
      //     fromMockProvider: false
      //   }
      //   */
      //   Defaults.location = locations;
      // })
    }
    else{
      // permanent modal that force user to enable gps
    }
  })

const configure = RNLocation.configure({
    distanceFilter: 50, // Meters
    desiredAccuracy: {
      ios: "best",
      android: "balancedPowerAccuracy"
    },
    // Android only
    androidProvider: "auto",
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
    // iOS Only
    activityType: "automotiveNavigation",
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: "portrait",
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
})

export default {
    configure,
    requestPermission
}

