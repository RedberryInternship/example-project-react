/* eslint-disable react/display-name */
import React, {ReactElement} from 'react'
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {Colors} from 'utils'

type RegistrationType1Props = {
  onPress: () => void
}

const RegistrationType1 = ({onPress}: RegistrationType1Props): ReactElement => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/icons/user.png')}
          style={styles.useIcon}
        />
        <Text style={styles.titleText}>მოგესალმებბიტ</Text>
        <Text style={styles.nameSurnameText}>saxel gvari</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          saxel gasf asdf as df as df asdf vari
        </Text>
      </View>
      <View style={styles.closeContainer}>
        <TouchableOpacity style={styles.closeTouchable} onPress={onPress}>
          <Image
            source={require('../../../assets/images/icons/close.png')}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>
    </>
  )
}
export default RegistrationType1

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  useIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginVertical: 8,
    tintColor: Colors.primaryBlue,
  },
  titleText: {
    fontSize: 17,
    lineHeight: 22,
    color: Colors.primaryDark,
  },
  nameSurnameText: {
    fontSize: 13,
    lineHeight: 22,
    color: '#436880',
    marginVertical: 8,
  },
  descriptionContainer: {
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 22,
    color: '#436880',
    marginVertical: 8,
    paddingHorizontal: 32,
  },
  closeContainer: {
    alignItems: 'center',
  },
  closeTouchable: {
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: '#0199F011',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: Colors.primaryBlue,
  },
})
