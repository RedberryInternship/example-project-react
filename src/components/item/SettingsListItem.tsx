import React, {ReactElement} from 'react'
import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import {useTranslation} from 'react-i18next'

import {Colors} from 'utils'

import Imgs from '../../../assets/images'

type SettingsListItemProps = {
  onPress: () => void
  image: ImageSourcePropType
  name: string
  value: string
  confirmed?: string | boolean | null
  valueColor: string
}

const SettingsListItem = ({
  onPress,
  image,
  name,
  value,
  confirmed,
  valueColor = Colors.primaryWhite,
}: SettingsListItemProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageAndName}>
          <Image source={image} style={styles.image} />
          <Text style={styles.name}>{t(name)}</Text>
        </View>

        <View style={styles.valueAndArrow}>
          <Text style={[styles.value, {color: valueColor}]}>
            {confirmed !== null ? t(value) : value}
          </Text>
          <Image source={Imgs.chervonRight} style={styles.arrow} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SettingsListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryDark,
    paddingBottom: 20,
    paddingTop: 20,
  },

  imageAndName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
  },
  valueAndArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  arrow: {
    width: 15,
    height: 15,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 24,
    resizeMode: 'contain',
  },
  name: {
    color: Colors.primaryGray,
  },
  value: {
    marginRight: 12,
  },
})
