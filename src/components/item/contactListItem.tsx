import React from 'react'
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native'

import {useTranslation} from 'react-i18next'

// utils

import {Colors} from 'utils'

type ContactItem = {
  image: ImageSourcePropType
  name: string
  value: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

const contactListItem = ({image, name, value, onPress, style}: ContactItem) => {
  const {t} = useTranslation()

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        <View style={styles.innerLeftContainer}>
          <Image source={image} style={styles.image} />
          <Text style={styles.name}>{t(name)}</Text>
        </View>

        <Text style={styles.value}>{value}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default contactListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(22, 27, 28, 0.1)',
    marginBottom: 16,
    paddingBottom: 16,
  },
  innerLeftContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 22,
    height: 21,
  },
  name: {
    color: Colors.primaryGray,
    marginLeft: 10,
  },
  value: {
    color: Colors.faqBlue,
  },
})
