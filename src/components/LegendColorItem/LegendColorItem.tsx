import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import BaseText from 'components/BaseText'
import { LegendColorItemFC } from './types'

const LegendColorItem: LegendColorItemFC = ({ text, color }) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <View style={[styles.backgrondView, { backgroundColor: color }]} />
      <BaseText style={styles.text}>{t(text)}</BaseText>
    </View>
  )
}

export default LegendColorItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 8,
    width: '50%',
  },
  text: {
    color: '#436880',
    fontSize: 12,
    marginLeft: 15,
  },
  backgrondView: {
    width: 12,
    height: 12,
    marginLeft: 8,
    borderRadius: 6,
  },
})
