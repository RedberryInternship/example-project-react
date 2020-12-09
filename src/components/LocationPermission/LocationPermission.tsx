import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors } from 'utils'
import { BaseText } from 'components'

const LocationPermission = () => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <BaseText style={styles.title}>{t('needLocation')}</BaseText>
    </View>
  )
}
export default LocationPermission

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginVertical: 8,
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
    color: Colors.primaryDark,
    textTransform: 'uppercase',
  },
})
