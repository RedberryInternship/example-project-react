/**
 * @format
 */
import 'react-native-gesture-handler'
import {enableScreens} from 'react-native-screens'

enableScreens()

import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'

import 'react-i18next'

import './src/utils/localization/localization'

import './src/utils/mapAndLocation/location'

AppRegistry.registerComponent(appName, () => App)
