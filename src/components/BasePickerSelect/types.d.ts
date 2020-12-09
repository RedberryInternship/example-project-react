import { StyleProp, ViewStyle } from 'react-native'
import { Item } from 'react-native-picker-select'

export type BasePickerSelectProps = {
  style?: StyleProp<ViewStyle>
  placeholder?: Item
  items: Item[]
  onDone: () => void
  onOpen?: () => void
  onChange: (value: any, index: number) => void
  value?: Item
}
