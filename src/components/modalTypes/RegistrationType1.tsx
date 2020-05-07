/* eslint-disable react/display-name */
import React, {ReactElement} from 'react'
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'

import {Colors, Defaults} from 'utils'
import images from 'assets/images'

type RegistrationType1Props = {
  onPress: () => void
}

const RegistrationType1 = ({onPress}: RegistrationType1Props): ReactElement => {
  return (
    <>
      <View style={styles.container}>
        <Image source={images.user} style={styles.useIcon} />
        <Text style={styles.titleText}>მოგესალმებით</Text>
        <Text style={styles.nameSurnameText}>
          {Defaults.userDetail?.first_name} {Defaults.userDetail?.last_name}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          თქვენ წარმატებკით დარეგისტრირდით, შეგიძლიათ დატენოთ მანაქანა
        </Text>
      </View>
      <View style={styles.closeContainer}>
        <TouchableOpacity style={styles.closeTouchable} onPress={onPress}>
          <Image source={images.close} style={styles.closeIcon} />
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
    marginTop: 80,
  },
  titleText: {
    fontSize: 17,
    lineHeight: 22,
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  nameSurnameText: {
    fontSize: 13,
    lineHeight: 22,
    color: '#436880',
    marginVertical: 8,
  },
  descriptionContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 22,
    color: '#436880',
    marginVertical: 24,
    paddingHorizontal: 32,
    textAlign: 'center',
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
