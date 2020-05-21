import React, {ReactElement} from 'react'
import {StyleSheet, Text, Platform, TouchableOpacity, View} from 'react-native'

import {Colors} from 'utils'
import {BaseNativeTouchable, BaseText} from 'components'

type BottomSheetFilterItemProps = {
  text: string
  onPress: () => void
  active: boolean
}

const BottomSheetFilterItem = ({
  text,
  onPress,
  active,
}: BottomSheetFilterItemProps): ReactElement => {
  const child = (
    <View
      style={[
        styles.container,
        {backgroundColor: active ? '#008AEE' : 'white'},
      ]}
    >
      <BaseText
        style={[styles.text, {color: active ? 'white' : Colors.primaryDark}]}
      >
        {text}
      </BaseText>
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

export default BottomSheetFilterItem

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
