import React, { ReactElement } from 'react'
import {
  TouchableOpacity,
  ImageSourcePropType,
  TextProperties,
  ImageStyle,
  ViewStyle,
  StyleProp,
  Text,
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'

import { Colors } from 'utils'

// declare text field type
type DrawerTextFieldItemProps = {
  onPress: () => void
  text: string
  textProps?: TextProperties
  image: ImageSourcePropType
  imageStyle?: ImageStyle
  container?: StyleProp<ViewStyle>
  badge?: number
}

const DrawerTextFieldItem = ({
  onPress,
  text,
  image,
  imageStyle,
  container,
  badge,
}: DrawerTextFieldItemProps): ReactElement => {
  const { t } = useTranslation()

  // if badge exist make it apper on item
  // Vobi Todo: badge > 0 is same as  badge !== undefined && badge > 0
  // Vobi Todo: you can just move it inside view and render it condintionally
  // Vobi Todo: or you can use useMemo not to redeclare it on every rerender
  const textFieldBadge =
    badge !== undefined && badge > 0 ? (
      <View style={styles.badgeConatainer}>
        <Text style={styles.badgeCounter}>{badge}</Text>
      </View>
    ) : null

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.textFieldContainer, container]}>
      <View style={styles.drawerImageContainer}>
        <Image style={[styles.image, imageStyle]} source={image} />
        <Text style={styles.textField}>{t(text)}</Text>
      </View>
      <View style={styles.textFieldBadge}>{textFieldBadge}</View>
    </TouchableOpacity>
  )
}

export default DrawerTextFieldItem

const styles = StyleSheet.create({
  textFieldContainer: {
    flex: 0,
    width: '90%',
    marginLeft: '5%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 20,
  },
  textField: {
    color: Colors.primaryGreyishWhite,
    marginLeft: 24,
  },
  image: {
    width: 24,
    height: 24,
    marginLeft: 24,
    resizeMode: 'contain',
  },
  badgeConatainer: {
    flex: 0,
    width: 27,
    height: 27,
    backgroundColor: Colors.primaryGreen,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCounter: {
    color: Colors.primaryGreyishWhite,
  },
  drawerImageContainer: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFieldBadge: {
    flex: 1,
  },
})
