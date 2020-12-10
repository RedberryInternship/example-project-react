import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors, Font } from 'utils'
import { BaseText } from 'components'
import { ContactListItemFC } from 'screens/drawer/contact/types'

const ContactListItem: ContactListItemFC = (
  {
    image,
    name,
    value,
    onPress,
  },
) => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        <View style={styles.innerLeftContainer}>
          <Image source={image} style={styles.image} />
          <BaseText style={styles.name}>{t(name)}</BaseText>
        </View>
        <Text style={styles.value}>{value}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ContactListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(22, 27, 28, 0.1)',
    minHeight: 50,
  },
  innerLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 22,
    height: 21,
  },
  name: {
    color: Colors.primaryGray,
    marginLeft: 10,
    fontFamily: Font.HELV_MED,
  },
  value: {
    color: Colors.faqBlue,
    fontSize: 14,
    flex: 0.8,
    textAlign: 'right',
  },
})
