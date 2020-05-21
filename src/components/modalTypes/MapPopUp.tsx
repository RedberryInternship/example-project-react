/* eslint-disable react/display-name */
import React, {ReactElement} from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Colors, getLocaleText} from '../../utils'
import {ChargerGroupPopupItem} from 'components'
import {ChargerDetail} from 'allTypes'
import images from 'assets/images'
import BaseText from 'components/baseUI/BaseText'

type MapPopUpProps = {
  data: Data
  close: () => void
}
type Data = {
  title: string
  address: string
  chargers: ChargerDetail[]
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
      <BaseText style={styles.title}>{t(title)}</BaseText>
      <View style={styles.addressContainer}>
        <Image source={images.mapPin} style={styles.mapPinIcon} />
        <BaseText style={styles.addressText}>{t(address)}</BaseText>
      </View>
      <View style={styles.groupChargerContainer}>
        {chargers?.map(
          (groupCharger: ChargerDetail, index: number): ReactElement => (
            <ChargerGroupPopupItem
              key={groupCharger.id}
              text={getLocaleText(groupCharger.name)}
              onPress={(): void => onPressItem(index)}
              code={groupCharger.code}
              active={!!groupCharger.active}
              fastCharger={groupCharger.connector_types?.[0]?.name !== 'Type 2'}
              privateCharger={!groupCharger.public}
              free={groupCharger.is_free}
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
