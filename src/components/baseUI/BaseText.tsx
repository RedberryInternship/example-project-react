import React, {ReactElement} from 'react'
import {Text, TextProps, StyleSheet} from 'react-native'
import {Colors} from 'utils'

interface BaseTextPropType extends TextProps {
  children: string | Element
}
const BaseText = (props: BaseTextPropType): ReactElement => {
  const setFontFamily = (): string => {
    if ('fontFamily' in props.style) return props.style?.fontFamily
    return 'HelveticaNeueLTStd-Ex'
  }
  return (
    <Text
      style={{
        letterSpacing: 0.2,
        color: 'white',
        fontSize: 13,
        fontFamily: setFontFamily(),
      }}
      {...props}>
      {props.children}
    </Text>
  )
}

export default BaseText

const styles = StyleSheet.create({
  localeUiContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primaryBlue,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  localeText: {
    color: Colors.primaryWhite,
  },
})
