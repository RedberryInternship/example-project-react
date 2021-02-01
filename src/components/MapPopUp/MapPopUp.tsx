import React, { ReactElement } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { ChargerDetail } from 'types'
import images from 'assets/images'
import BaseText from 'components/BaseText'
import ChargerGroupPopupItem from 'components/ChargerGroupPopupItem'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Colors, getLocaleText } from 'utils'
import { MapPopUpFC } from './types'

const MapPopUp: MapPopUpFC = (
  {
    data: {
      onChargerSelect,
      chargers,
      address,
      title,
    },
    close,
  },
) => {
  const { t } = useTranslation()

  const onPressItem = (index: number): void => {
    onChargerSelect(index)
    close()
  }
  return (
    <TouchableOpacity activeOpacity={1}>
      <ScrollView style={styles.container}>
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
                fastCharger={
                  groupCharger.connector_types?.[0]?.name !== 'Type 2'
                }
                privateCharger={!groupCharger.public}
                free={groupCharger.is_free}
              />
            ),
          )}
        </View>
      </ScrollView>
    </TouchableOpacity>
  )
}
export default MapPopUp

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginVertical: 8,
  },
  title: {
    fontSize: 15,
    lineHeight: 18,
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
