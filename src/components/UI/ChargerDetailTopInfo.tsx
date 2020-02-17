import React, {useEffect, useState, ReactElement} from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Colors} from 'utils'
import {AxiosResponse} from 'axios'

type ChargerDetailTopInfoProps = {
  chargerLocationDirectionPress: () => void
  showChargerLocationPress: () => void
  favouritePress: () => void
  code: string | number | undefined
  name: string
  location: string
  distance: () => Promise<AxiosResponse<any>> // Promis
}

const ChargerDetailTopInfo = ({
  chargerLocationDirectionPress,
  showChargerLocationPress,
  favouritePress,
  code,
  name,
  location,
  distance,
}: ChargerDetailTopInfoProps): ReactElement => {
  const {t} = useTranslation()
  const [_distance, setDistance] = useState('')

  useEffect(() => {
    distance().then(({data}: any) => {
      data.rows &&
        data.rows[0] &&
        data.rows[0].elements &&
        data.rows[0].elements[0] &&
        setDistance(data.rows[0].elements[0].distance.value)
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.nameAndfavIconContainer}>
        <View style={styles.nameAndCodeContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.codeContainer}>კოდი:#{code}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={favouritePress}
            style={styles.favIconContainer}>
            <Image
              source={require('../../../assets/images/icons/ic_favorite.png')}
              style={styles.favIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{height: 24}} />
      <View style={styles.locationAndDistanceContainer}>
        <View style={styles.locationAndMapPressContainer}>
          <View style={styles.loactionContainer}>
            <Image
              source={require('../../../assets/images/icons/ic_map_pin.png')}
              style={styles.locationIcon}
            />
            <Text style={styles.locationText} numberOfLines={2}>
              {location}
            </Text>
          </View>
          <TouchableOpacity
            onPress={showChargerLocationPress}
            style={styles.seeOnMapContainer}>
            <Text style={styles.seeOnMapText} numberOfLines={1}>
              {t('chargerDetail.seeOnMap')}
            </Text>
            <Image
              source={require('../../../assets/images/icons/arrow_right.png')}
              style={styles.arrowRightIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.distanceContainer}>
          <TouchableOpacity
            onPress={chargerLocationDirectionPress}
            style={styles.distanceTouchable}>
            <Image
              source={require('../../../assets/images/icons/corner-up-right.png')}
              style={styles.distanceIcon}
            />
            <Text style={styles.distanceText} numberOfLines={1}>
              {_distance} {t('km')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ChargerDetailTopInfo

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 16,
    backgroundColor: Colors.primaryBlue.concat('16'),
    borderRadius: 8,
    height: 152,
  },
  nameAndfavIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  nameAndCodeContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nameText: {
    opacity: 0.8,
  },
  codeContainer: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  favIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0199F016',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favIcon: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    tintColor: Colors.primaryBlue,
  },
  locationAndDistanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  locationAndMapPressContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  loactionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  locationIcon: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
  },
  locationText: {
    color: Colors.primaryGray,
    fontSize: 11,
    marginLeft: 8,
  },
  seeOnMapContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  seeOnMapText: {
    color: Colors.primaryGreen,
    marginLeft: 8,
  },
  arrowRightIcon: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    tintColor: Colors.primaryGreen,
  },
  distanceContainer: {
    justifyContent: 'flex-end',
  },
  distanceTouchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBlue,
    height: 41,
    borderRadius: 6,
    width: 100,
  },
  distanceIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  distanceText: {
    color: Colors.primaryWhite,
    fontSize: 13,
    marginLeft: 8,
    fontWeight: 'bold',
  },
})
