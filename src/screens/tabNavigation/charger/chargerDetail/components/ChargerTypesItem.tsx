import React, { ReactElement } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors } from 'utils'
import { BaseCheckbox, BaseText } from 'components'
import images from 'assets/images'

type ChargerTypesItemProps = {
  type: 'Combo 2' | 'Type 2' | 'CHAdeMO'
  power: string
  active: boolean
  onPress: () => void
}

const ChargerTypesItem = ({
  type,
  power,
  active,
  onPress,
}: ChargerTypesItemProps): ReactElement => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.indexTextContainer}>
          <Image source={images[type]} style={styles.connetctorsIcon} />
        </View>
        <View style={styles.powerAndTypeTextContainer}>
          <BaseText style={styles.typeText}>{type}</BaseText>
          <BaseText style={styles.powerText}>
            {t('chargerDetail.powerOfChargerType', { power })}
          </BaseText>
        </View>
        <BaseCheckbox active={active} />
      </View>
    </TouchableOpacity>
  )
}

export default ChargerTypesItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#08141B',
    height: 55,
    marginBottom: 8,
  },
  indexTextContainer: {
    width: 48,
    height: '100%',
    backgroundColor: '#4CD96433',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexText: {
    fontSize: 17,
    color: Colors.primaryGreen,
    fontWeight: 'bold',
  },
  powerAndTypeTextContainer: {
    justifyContent: 'space-between',
    marginLeft: 12,
    height: '100%',
    paddingVertical: 8,
  },
  typeText: {
    fontSize: 13,
    color: Colors.primaryWhite,
  },
  powerText: {
    fontSize: 11,
    color: Colors.primaryGray,
  },
  connetctorsIcon: {
    height: 20,
    resizeMode: 'contain',
  },
})
