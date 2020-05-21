import React, {ReactElement, useCallback} from 'react'
import {Text, TextProps, StyleSheet} from 'react-native'
import i18next from 'i18next'

import {Colors, GNOME} from 'utils'

interface BaseTextPropType extends TextProps {
  children: string | Element
  style?: any
}

const BaseText = ({
  style,
  children,
  ...props
}: BaseTextPropType): ReactElement => {
  const setFontFamily = useCallback((): Record<string, string> | undefined => {
    if (style && 'fontFamily' in style) {
      // return style?.fontFamily
    } else return {fontFamily: GNOME.HELV_EX}
  }, [style])

  const setFontSize = useCallback((): Record<string, number> | undefined => {
    if (style && 'fontSize' in style) {
      return {
        fontSize:
          i18next.language == 'ka'
            ? style?.fontSize
            : parseInt(style?.fontSize) + 1,
      }
    } else return {fontSize: 13}
  }, [style, i18next.language])

  return (
    <Text
      {...props}
      style={[styles.text, style, setFontFamily(), setFontSize()]}
    >
      {children}
    </Text>
  )
}

export default BaseText

const styles = StyleSheet.create({
  text: {
    letterSpacing: 0.2,
    color: Colors.primaryWhite,
    fontSize: 13,
  },
})
