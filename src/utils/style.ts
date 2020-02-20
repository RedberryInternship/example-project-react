import {Text, TextInput, TouchableOpacity} from 'react-native'
import Colors from './colors'

export default {
  m4: 4,
  m8: 8,
  m16: 16,
  m32: 32,
}

Text.defaultProps = Text.defaultProps || {}

TextInput.defaultProps = TextInput.defaultProps || {}

TouchableOpacity.defaultProps = TextInput.defaultProps || {}

Text.defaultProps.allowFontScaling = false
Text.defaultProps.style = {letterSpacing: 0.2, color: 'white', fontSize: 13}

TextInput.defaultProps.allowFontScaling = false
TextInput.defaultProps.style = {
  letterSpacing: 0.2,
  color: 'white',
  fontSize: 13,
}

TouchableOpacity.defaultProps.hitSlop = {
  top: 15,
  bottom: 15,
  left: 15,
  right: 15,
}
TouchableOpacity.defaultProps.activeOpacity = 0.7
