import React, {ReactElement, useCallback} from 'react'
import {Text, TextProps, StyleSheet} from 'react-native'
import i18next from 'i18next'

import {Colors, GNOME, Const} from 'utils'

interface BaseTextPropType extends TextProps {
  children: string | Element
  // style?: StyleProp<Text>
}

const BaseText = ({
  style,
  children,
  ...props
}: BaseTextPropType): ReactElement => {
  const setStyle = useCallback(():
    | Record<string, string | number>
    | undefined => {
    style = StyleSheet.flatten(style)

    let fontSize = style?.fontSize ?? 13,
      lineHeight = style?.lineHeight ?? style?.fontSize ?? 13,
      fontFamily = GNOME.HELV_NORM,
      letterSpacing = style?.letterSpacing ?? 0.2
    const lang: 'ka' | 'ru' | 'en' = i18next.language
    lineHeight += Const.platformIOS ? 0 : 4

    if (style && 'fontFamily' in style) {
      fontFamily = style.fontFamily as string

      if (lang === 'en') {
        // fontSize = style?.fontSize ?? 13 + 1
        fontFamily =
          style.fontFamily == GNOME.HELV_HVEX ? GNOME.HELV_MED : GNOME.HELV_NORM
      }
      //  else if (lang === 'ru') {
      // }
    }
    if (lang === 'en') {
      fontSize = (style?.fontSize ?? 13) + 1
      letterSpacing = 0.4
    }

    return {
      fontFamily,
      fontSize,
      lineHeight,
      letterSpacing,
    }
  }, [style, i18next.language])

  return (
    <Text
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
