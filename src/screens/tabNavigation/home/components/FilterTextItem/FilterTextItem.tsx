import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from 'utils'
import BaseText from 'components/BaseText'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FilterTextItemFC } from './types'

const FilterTextItem: FilterTextItemFC = (
  {
    text,
    onPress,
    active,
  },
) => (
  <TouchableOpacity
    style={[
      styles.container,
      { backgroundColor: active ? '#008AEE' : 'white' },
    ]}
    onPress={onPress}
    testID={text}
  >
    <BaseText
      style={[styles.text, { color: active ? 'white' : Colors.primaryDark }]}
    >
      {text}
    </BaseText>
  </TouchableOpacity>
)

export default React.memo(FilterTextItem)

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: 'white',
    marginHorizontal: 8,
  },
  text: {
    fontSize: 11,
    lineHeight: 22,
  },
})
