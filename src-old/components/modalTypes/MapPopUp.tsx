/* eslint-disable react/display-name */
import React, {ReactElement} from 'react'
import {Text, View, Image, StyleSheet, Alert} from 'react-native'
import {Colors} from '../../utils'
import {ChargerGroupPopupItem} from 'components'
import {useTranslation} from 'react-i18next'
import {Charger} from 'allTypes'

type MapPopUpProps = {
  onPress?: (index: number) => void
  data: Data
}
type Data = {
  title: string
  address: string
  chargers: Charger[]
}
const MapPopUp = ({data}: MapPopUpProps): ReactElement => {
  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(data.title)}</Text>
      <View style={styles.addressContainer}>
        <Image
          source={require('../../../assets/images/icons/ic_map_pin.png')}
          style={styles.mapPinIcon}
        />
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
export default MapPopUp

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
