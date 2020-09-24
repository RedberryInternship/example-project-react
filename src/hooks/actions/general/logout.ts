import AsyncStorage from '@react-native-community/async-storage'
import NavigationActions from 'utils/navigation.service'
import Defaults from 'utils/defaults'

export const LOG_OUT = 'LOG_OUT'

export const logOut = () => {
  AsyncStorage.clear()
  Defaults.token = ''
  Defaults.userDetail = null
  NavigationActions.navigate('Home')

  return {
    type: LOG_OUT,
  }
}