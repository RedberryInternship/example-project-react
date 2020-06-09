import React, {ReactElement} from 'react'
import {
  BorderlessButton,
  BorderlessButtonProperties,
} from 'react-native-gesture-handler'
import {Colors} from 'utils'

interface BaseNativeTouchableProps extends BorderlessButtonProperties {
  children: Element
}

const BaseNativeTouchable = (props: BaseNativeTouchableProps): ReactElement => {
  return (
    <BorderlessButton
      hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
      activeOpacity={0.8}
      rippleColor={Colors.primaryBackground}
      borderless={true}
      {...props}
    >
      {props.children}
    </BorderlessButton>
  )
}

export default React.memo(BaseNativeTouchable)
