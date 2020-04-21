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
      <Text style={styles.title}>{t(data.title)}</Text>
      <View style={styles.addressContainer}>
        <Image source={images.mapPin} style={styles.mapPinIcon} />
        <Text style={styles.addressText}>{t(data.address)}</Text>
      </View>
      <View style={styles.groupChargerContainer}>
        <ChargerGroupPopupItem
          text={'sdf'}
          //TODO : handle onPress
          onPress={() => {
            Alert.alert('sd')
          }}
          code={'345'}
          active={true}
        />
        <ChargerGroupPopupItem
          text={'sdf'}
          //TODO : handle onPress
          onPress={() => {
            Alert.alert('sd')
          }}
          code={'345'}
          active={false}
        />
      </View>
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
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,

    paddingBottom: 16,
  },
  addressText: {
    color: '#436880',
    fontSize: 13,
    marginLeft: 12,
  },
  groupChargerContainer: {},
  mapPinIcon: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
  },
})
