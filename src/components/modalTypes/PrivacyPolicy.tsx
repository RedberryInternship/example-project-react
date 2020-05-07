/* eslint-disable react/display-name */
import React, {ReactElement} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Colors} from '../../utils'
import images from 'assets/images'

type PrivacyPolicyProps = {
  onPress: () => void
}
const PrivacyPolicy = ({onPress}: PrivacyPolicyProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'წესები'}</Text>
      <ScrollView style={{marginVertical: 32}}>
        <TouchableOpacity>
          <Text style={styles.contentStyle}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
            voluptas enim molestiae vel sunt eius! Illum veniam laudantium
            debitis reiciendis optio illo, dolorem omnis ea porro ducimus
            pariatur distinctio iure? Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Esse voluptas enim molestiae vel sunt eius! Illum
            veniam laudantium debitis reiciendis optio illo, dolorem omnis ea
            porro ducimus pariatur distinctio iure? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Esse voluptas enim molestiae vel sunt
            eius! Illum veniam laudantium debitis reiciendis optio illo, dolorem
            omnis ea porro ducimus pariatur distinctio iure? Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Esse voluptas enim molestiae
            vel sunt eius! Illum veniam laudantium debitis reiciendis optio
            illo, dolorem omnis ea porro ducimus pariatur distinctio iure? Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Esse voluptas
            enim molestiae vel sunt eius! Illum veniam laudantium debitis
            reiciendis optio illo, dolorem omnis ea porro ducimus pariatur
            distinctio iure? dolor, sit amet consectetur adipisicing elit. Esse
            voluptas enim molestiae vel sunt eius! Illum veniam laudantium
            debitis reiciendis optio illo, dolorem omnis ea porro ducimus
            pariatur distinctio iure? dolor, sit amet consectetur adipisicing
            elit. Esse voluptas enim molestiae vel sunt eius! Illum veniam
            laudantium debitis reiciendis optio illo, dolorem omnis ea porro
            ducimus pariatur distinctio iure? dolor, sit amet consectetur
            adipisicing elit. Esse voluptas enim molestiae vel sunt eius! Illum
            veniam laudantium debitis reiciendis optio illo, dolorem omnis ea
            porro ducimus pariatur distinctio iure? dolor, sit amet consectetur
            adipisicing elit. Esse voluptas enim molestiae vel sunt eius! Illum
            veniam laudantium debitis reiciendis optio illo, dolorem omnis ea
            porro ducimus pariatur distinctio iure?
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.closeButtonView}>
        <TouchableOpacity style={styles.closeButtonTouchable} onPress={onPress}>
          <Image source={images.close} style={styles.closeButtonImage} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default PrivacyPolicy

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginVertical: 8,
    flex: 1,
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  contentStyle: {
    color: Colors.primaryDark,
    fontSize: 13,
    marginLeft: 12,
    lineHeight: 16,
    marginVertical: 32,
  },
  closeButtonView: {
    alignItems: 'stretch',
  },
  closeButtonTouchable: {
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: '#0199F011',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  closeButtonImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: Colors.primaryBlue,
  },
})
