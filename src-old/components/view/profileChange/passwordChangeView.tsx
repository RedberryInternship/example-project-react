import React, {useState, useRef} from 'react'

import {View, StyleSheet, Alert} from 'react-native'

// components

import {BaseInput} from 'components'

const passwordChangeView = ({navigation}: any) => {
  const firstInput = useRef<any>(null)
  const secondInput = useRef<any>(null)
  const thirdInput = useRef<any>(null)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repetePassword, setRepetePassword] = useState('')

  return (
    <View style={styles.container}>
      <BaseInput
        title={'settings.currentPassword'}
        image={require('../../../../assets/images/icons/lock.png')}
        onChangeText={(text: string) => setCurrentPassword(text)}
        onSubmitEditing={() => {
          secondInput.current.focus()
        }}
        secureTextEntry={true}
        ref={firstInput}
      />

      <BaseInput
        title={'settings.newPassword'}
        image={require('../../../../assets/images/icons/lock.png')}
        onChangeText={(text: string) => setNewPassword(text)}
        onSubmitEditing={() => {
          thirdInput.current.focus()
        }}
        secureTextEntry={true}
        ref={secondInput}
      />

      <BaseInput
        title={'settings.repetePassword'}
        image={require('../../../../assets/images/icons/lock.png')}
        onChangeText={(text: string) => setRepetePassword(text)}
        onSubmitEditing={() => {
          updateUserPassword(
            currentPassword,
            newPassword,
            repetePassword,
            navigation,
          )
        }}
        secureTextEntry={true}
        ref={thirdInput}
      />
    </View>
  )
}

const updateUserPassword = (
  currentPassword: string,
  newPassword: string,
  repetePassword: string,
  navigation: any,
) => {
  Alert.alert(
    'Password Change',
    `${currentPassword} | ${newPassword} | ${repetePassword}`,
  )
  navigation.goBack()
}

export default passwordChangeView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
