/* eslint-disable react/display-name */
import React, {ReactElement} from 'react'
import {Text, View, Image, StyleSheet, Alert} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Colors} from 'utils'
import {ChargerGroupPopupItem} from 'components'
import {Charger} from 'allTypes'
import images from 'assets/images'

type LocationPermissionProps = {
  onPress?: (index: number) => void
  data: Data
}
type Data = {
  title: string
  address: string
  chargers: Charger[]
}
const LocationPermission = ({data}: LocationPermissionProps): ReactElement => {
  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('needLocation')}</Text>
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
