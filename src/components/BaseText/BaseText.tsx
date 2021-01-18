import React, { useCallback } from 'react'
import { Text, StyleSheet } from 'react-native'
import i18next from 'i18next'
import { Locale } from 'types'
import { Colors, Font, Const } from 'utils'
import { BaseTextFC, SetStyle } from './types'

const BaseText: BaseTextFC = (
  {
    style,
    children,
    ...props
  },
) => {
  const setStyle = useCallback((): SetStyle => {
    const flattenedStyle = StyleSheet.flatten(style)

    let fontSize = flattenedStyle?.fontSize ?? 13;
    let lineHeight = flattenedStyle?.lineHeight ?? style?.fontSize ?? 13;
    let fontFamily = Font.HELV_NORM;
    let letterSpacing = flattenedStyle?.letterSpacing ?? 0.2
    const lang: Locale = i18next.language as Locale
    lineHeight += Const.platformIOS ? 0 : 4

    if (flattenedStyle && 'fontFamily' in flattenedStyle) {
      fontFamily = flattenedStyle.fontFamily as string

      if (lang === 'en') {
        fontFamily = flattenedStyle.fontFamily === Font.HELV_HVEX
          ? Font.HELV_MED
          : Font.HELV_NORM
      }
    }
    if (lang === 'en') {
      fontSize = (flattenedStyle?.fontSize ?? 13) + 1
      letterSpacing = 0.4
    }

    return {
      fontFamily,
      fontSize,
      lineHeight,
      letterSpacing,
    }
  }, [style])

  return (
    <Text
      numberOfLines={1}
      {...props}
      allowFontScaling={false}
      style={[styles.text, style, setStyle()]}
    >
      {children}
    </Text>
  )
}

export default React.memo(BaseText)

const styles = StyleSheet.create({
  text: {
    letterSpacing: 0.2,
    color: Colors.primaryWhite,
    textAlignVertical: 'center',
    fontSize: 13,
  },
})
