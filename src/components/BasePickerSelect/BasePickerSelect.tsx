import React, { forwardRef } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { View, StyleSheet } from 'react-native'
import { BasePickerSelectProps } from './types'

const BasePickerSelect = forwardRef(
  (
    {
      placeholder,
      onChange,
      onDone,
      onOpen,
      items,
      style,
    }: BasePickerSelectProps,
    ref,
  ) => (
      <View style={style}>
        <RNPickerSelect
          placeholder={placeholder}
          items={items}
          onValueChange={onChange}
          style={styles}
          onDonePress={onDone}
          useNativeAndroidPickerStyle={false}
          ref={ref}
          onOpen={onOpen}
        />
      </View>
    ),
)
export default BasePickerSelect

const styles = StyleSheet.create({
  inputIOSContainer: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputAndroidContainer: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputIOS: {
    fontSize: 13,
    color: 'white',
  },
  inputAndroid: {
    fontSize: 13,
    color: 'white',
  },
  placeholder: {
    color: 'white',
    fontSize: 13,
  },
})
