/* eslint-disable react/display-name */
import React, {ReactElement} from 'react'
import {Text, View, Image, StyleSheet, Alert} from 'react-native'
import {Colors, getLocaleText} from '../../utils'
import {ChargerGroupPopupItem} from 'components'
import {useTranslation} from 'react-i18next'
import {Charger, ChargerDetail} from 'allTypes'
import Imgs from '../../../assets/images'

type MapPopUpProps = {
  data: Data
  close: () => void
}
type Data = {
  title: string
  address: string
  chargers: Charger
  onChargerSelect: (index: number) => void
}
const MapPopUp = ({
  data: {title, address, chargers, onChargerSelect},
  close,
}: MapPopUpProps): ReactElement => {
  const {t} = useTranslation()

  const onPressItem = (index: number): void => {
    onChargerSelect(index)
    close()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(title)}</Text>
      <View style={styles.addressContainer}>
        <Image source={Imgs.mapPin} style={styles.mapPinIcon} />
        <Text style={styles.addressText}>{t(address)}</Text>
      </View>
      <View style={styles.groupChargerContainer}>
        <ChargerGroupPopupItem
          text={getLocaleText(chargers.name)}
          onPress={(): void => onPressItem(-1)}
          code={chargers.code}
          active={chargers.active}
        />
        {chargers.charger_group?.chargers?.map(
          (groupCharger: ChargerDetail, index: number): ReactElement => (
            <ChargerGroupPopupItem
              key={groupCharger.id}
              text={getLocaleText(groupCharger.name)}
              onPress={(): void => onPressItem(index)}
              code={groupCharger.code}
              active={groupCharger.active}
            />
          ),
        )}
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
