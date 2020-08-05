import React, {ReactElement} from 'react'
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

import {Colors, GNOME} from 'utils'
import {BaseText} from 'components'

type ContactItemProps = {
  image: ImageSourcePropType
  name: string
  value: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

const ContactListItem = ({
  image,
  name,
  value,
  onPress,
}: ContactItemProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        <View style={styles.innerLeftContainer}>
          <Image source={image} style={styles.image} />
          <BaseText style={styles.name}>{t(name)}</BaseText>
        </View>
        <BaseText style={styles.value}>{value}</BaseText>
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
    minHeight: 50
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
    fontFamily: GNOME.HELV_MED,
  },
  value: {
    color: Colors.faqBlue,
    fontSize: 14,
    flex: 0.8,
    textAlign: 'right'
  },
})
