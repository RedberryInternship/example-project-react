import React, {ReactElement} from 'react'
import {
  BorderlessButton,
  BorderlessButtonProperties,
} from 'react-native-gesture-handler'

interface BaseNativeTouchableProps extends BorderlessButtonProperties {
  children: Element
}

const BaseNativeTouchable = (props: BaseNativeTouchableProps): ReactElement => {
  return (
    <BorderlessButton
      hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
      // style={{width: '100%', height: '100%'}}
      activeOpacity={0.8}
      rippleColor={'green'}
      borderless={true}
      {...props}>
      {props.children}
    </BorderlessButton>
  )
}

export default BaseNativeTouchable
