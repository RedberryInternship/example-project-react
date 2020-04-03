import React, {ReactElement} from 'react'
import {StyleSheet, Text, Platform, TouchableOpacity, View} from 'react-native'

import {Colors} from 'utils'
import {BaseNativeTouchable} from 'components'

type PopupFilterProps = {
  text: string
  onPress: () => void
  active: boolean
}

const PopupFilter = ({
  text,
  onPress,
  active,
}: PopupFilterProps): ReactElement => {
  const child = (
    <View
      style={[
        styles.container,
        {backgroundColor: active ? '#008AEE' : 'white'},
      ]}>
      <Text
        style={[styles.text, {color: active ? 'white' : Colors.primaryDark}]}>
        {text}
      </Text>
    </View>
  )
  return (
    <>
      {Platform.OS === 'ios' ? (
        <TouchableOpacity onPress={onPress}>{child}</TouchableOpacity>
      ) : (
        <BaseNativeTouchable borderless={false} onPress={onPress}>
          {child}
        </BaseNativeTouchable>
      )}
    </>
  )
}

export default PopupFilter

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
    marginHorizontal: 4,
    marginVertical: 6,
    minWidth: '30%',
  },
  text: {
    fontSize: 11,
    lineHeight: 22,
    flex: 1,
  },
})
