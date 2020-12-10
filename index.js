import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import App from './App'
import 'react-i18next'
import './src/utils/localization/localization'
import './src/utils/location'

enableScreens()

AppRegistry.registerComponent(appName, () => App)
