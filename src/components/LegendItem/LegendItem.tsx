import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors } from 'utils'
import { BaseText, RootPin } from 'components'
import { ChargerMarkerColor } from 'types'
import { LegendItemFC } from './types'

const LegendItem: LegendItemFC = ({ text, ...props }) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <BaseText style={styles.text}>{t(text)}</BaseText>
      <RootPin
        pinColorType={ChargerMarkerColor.group}
        width={30}
        height={38}
        {...props}
      />
    </View>
  )
}

export default LegendItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopColor: Colors.primaryBackground.concat('22'),
    borderTopWidth: 1,
  },
  text: {
    color: '#436880',
    fontSize: 13,
  },
})
