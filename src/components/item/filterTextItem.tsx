import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {Colors} from 'utils'

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
})

const filterTextItem = ({text, onPress, active}: any) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: active ? '#008AEE' : 'white'},
      ]}
      onPress={onPress}>
      <Text
        style={{
          fontSize: 11,
          color: active ? 'white' : Colors.primaryDark,
          lineHeight: 22,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default filterTextItem
