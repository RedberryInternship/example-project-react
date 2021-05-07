import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors } from 'utils'
import BaseText from 'components/BaseText'
import { DrawerTextFieldItemFC } from 'screens/drawer/drawer/types'

const DrawerTextFieldItem: DrawerTextFieldItemFC = (
  {
    onPress,
    text,
    image,
    imageStyle,
    container,
    badge,
    testID,
  },
) => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.textFieldContainer, container]}
      testID={testID}
    >
      <View style={styles.drawerImageContainer}>
        <Image style={[styles.image, imageStyle]} source={image} />
        <BaseText style={styles.textField}>{t(text)}</BaseText>
      </View>
      {!!badge && (
        <View style={styles.textFieldBadge}>
          <View style={styles.badgeContainer}>
            <BaseText style={styles.badgeCounter}>{badge}</BaseText>
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default DrawerTextFieldItem

const styles = StyleSheet.create({
  textFieldContainer: {
    flex: 0,
    width: '100%',
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 20,
  },
  textField: {
    color: Colors.primaryGreyishWhite,
    marginLeft: 16,
    flex: 1,
    fontSize: 14,
  },
  image: {
    width: 24,
    height: 24,
    marginLeft: 0,
    resizeMode: 'contain',
  },
  badgeContainer: {
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFieldBadge: {
    flex: 0,
    marginRight: 8,
  },
})
