import React, {ReactElement} from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Colors} from 'utils'
import {BaseCheckbox} from 'components'

type ChargerTypesItemProps = {
  index: number
  type: string
  power: string
  active: boolean
  onPress: () => void
}

const ChargerTypesItem = ({
  index,
  type,
  power,
  active,
  onPress,
}: ChargerTypesItemProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.indexTextContainer}>
          <Text style={styles.indexText}>{index}</Text>
        </View>
        <View style={styles.powerAndTypeTextContainer}>
          <Text style={styles.typeText}>{type}</Text>
          <Text style={styles.powerText}>
            {t('chargerDetail.powerOfChargerType', {power})}
          </Text>
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
})
