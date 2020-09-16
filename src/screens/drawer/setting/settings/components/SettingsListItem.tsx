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
import images from 'assets/images'
import {UserSettingEnum} from '../../../../../../@types//allTypes.d'
import {BaseText} from 'components'

type SettingsListItemProps = {
  onPress: () => void
  image: ImageSourcePropType
  name: string
  value: string
  type: UserSettingEnum
  onEmptyText?: string
  color?: string
}

const SettingsListItem = ({
  onPress,
  image,
  name,
  value,
  onEmptyText,
  color,
}: SettingsListItemProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageAndName}>
          <Image source={image} style={styles.image} />
          <BaseText style={styles.name}>{t(name)}</BaseText>
        </View>

        <View style={styles.valueAndArrow}>
          <BaseText
            style={[styles.value, {color: value ? Colors.primaryWhite : color}]}
            numberOfLines={1}
          >
            {value ? t(value.toString()) : t(onEmptyText ?? '')}
          </BaseText>
          <Image source={images.chervonRight} style={styles.arrow} />
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
    marginLeft: 16,
  },
  valueAndArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    paddingLeft: 16,
    flex: 1,
    justifyContent: 'flex-end',
  },
  arrow: {
    width: 15,
    height: 15,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  name: {
    color: Colors.primaryGray,
  },
  value: {
    marginRight: 12,
    paddingLeft: 16,
  },
})
