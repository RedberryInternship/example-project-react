/* eslint-disable react/display-name */
import React, {ReactElement} from 'react'
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {Colors} from 'utils'
import Imgs from '../../../assets/images'

type RegistrationType1Props = {
  onPress: () => void
}

const RegistrationType1 = ({onPress}: RegistrationType1Props): ReactElement => {
  return (
    <>
      <View style={styles.container}>
        <Image source={Imgs.user} style={styles.useIcon} />
        {/* TODO: Title Text */}
        <Text style={styles.titleText}>title</Text>
        {/* TODO: First Name & Last Name Text */}
        <Text style={styles.nameSurnameText}>First Name and Last Name</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          {/* TODO: Description Text */}
          Description
        </Text>
      </View>
      <View style={styles.closeContainer}>
        <TouchableOpacity style={styles.closeTouchable} onPress={onPress}>
          <Image source={Imgs.close} style={styles.closeIcon} />
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
