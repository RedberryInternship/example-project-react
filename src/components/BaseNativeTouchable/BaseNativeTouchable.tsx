import React from 'react'
import { StyleSheet } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Colors } from 'utils'
import { BaseNativeTouchableFC } from './types'

const BaseNativeTouchable: BaseNativeTouchableFC = (props) => {
  const { children } = props
  return (
    <BorderlessButton
      hitSlop={styles.borderlessButtonHitSlop}
      activeOpacity={0.8}
      rippleColor={Colors.primaryBackground}
      borderless
      {...props}
    >
      {children}
    </BorderlessButton>
  )
}

export default React.memo(BaseNativeTouchable)

const styles = StyleSheet.create(
  {
    borderlessButtonHitSlop: {
      bottom: 15,
      right: 15,
      left: 15,
      top: 15,
    },
  },
)
