/* eslint-disable react/display-name */
import React from 'react'
import {Text, View, TouchableOpacity, Image} from 'react-native'
import {Colors} from 'utils'

export default ({onPress}: any) => {
  return (
    <>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../../assets/images/icons/user.png')}
          style={{
            width: 28,
            height: 28,
            resizeMode: 'contain',
            marginVertical: 8,
            tintColor: Colors.primaryBlue,
          }}
        />
        <Text style={{fontSize: 17, lineHeight: 22, color: Colors.primaryDark}}>
          მოგესალმებბიტ
        </Text>
        <Text
          style={{
            fontSize: 13,
            lineHeight: 22,
            color: '#436880',
            marginVertical: 8,
          }}>
          saxel gvari
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 13,
            lineHeight: 22,
            color: '#436880',
            marginVertical: 8,
            paddingHorizontal: 32,
          }}>
          saxel gasf asdf as df as df asdf vari
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            borderRadius: 25,
            width: 50,
            height: 50,
            backgroundColor: '#0199F011',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={onPress}>
          <Image
            source={require('../../../assets/images/icons/close.png')}
            style={{
              width: 28,
              height: 28,
              resizeMode: 'contain',
              alignSelf: 'center',
              tintColor: Colors.primaryBlue,
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  )
}
