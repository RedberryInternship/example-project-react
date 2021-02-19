import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors } from 'utils'
import BaseText from 'components/BaseText'
import RootPin from 'components/RootPin'
import { LegendItemFC } from './types'

const LegendItem: LegendItemFC = ({ text, fastCharger, privateCharger }) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <RootPin
        width={32}
        height={45}
        fastCharger={fastCharger}
        privateCharger={privateCharger}
      />
      <BaseText style={styles.text}>{t(text)}</BaseText>
    </View>
  )
}

export default LegendItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: Colors.primaryBackground.concat('22'),
    borderBottomWidth: 1,
  },
  text: {
    color: '#436880',
    fontSize: 13,
    marginLeft: 20,
  },
})
