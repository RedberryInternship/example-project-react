import React, {ReactElement} from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

import {Colors} from 'utils'

type FilterTextItemProps = {
  text: string
  onPress: () => void
  active: boolean
}
const FilterTextItem = ({
  text,
  onPress,
  active,
}: FilterTextItemProps): ReactElement => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: active ? '#008AEE' : 'white'},
      ]}
      onPress={onPress}>
      <Text
        style={[styles.text, {color: active ? 'white' : Colors.primaryDark}]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default FilterTextItem

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
