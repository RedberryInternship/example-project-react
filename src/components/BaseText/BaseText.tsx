import React, { useCallback } from 'react'
import { Text, StyleSheet } from 'react-native'
import i18next from 'i18next'
import { Locale } from 'types'
import colors from 'utils/colors'
import font from 'utils/font'
import * as consts from 'utils/const'
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

    let fontSize = flattenedStyle?.fontSize || 13;
    let lineHeight = flattenedStyle?.lineHeight || style?.fontSize || 13;
    let fontFamily = font.HELV_NORM;
    let letterSpacing = flattenedStyle?.letterSpacing ?? 0.2
    const lang: Locale = i18next.language as Locale
    lineHeight += consts.platformIOS ? 0 : 4

    if (flattenedStyle && 'fontFamily' in flattenedStyle) {
      fontFamily = flattenedStyle.fontFamily as string

      if (lang === 'en') {
        fontFamily = flattenedStyle.fontFamily === font.HELV_HVEX
          ? font.HELV_MED
          : font.HELV_NORM
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
    color: colors.primaryWhite,
    textAlignVertical: 'center',
    fontSize: 13,
  },
})
