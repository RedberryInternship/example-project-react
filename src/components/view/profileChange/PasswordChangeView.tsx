import React, {ReactElement} from 'react'

import {View, StyleSheet} from 'react-native'

// hooks

import {usePasswordChange} from '../../../hooks'

// components
import {BaseInput} from '../..'

import Imgs from '../../../../assets/images'

const PasswordChangeView = ({
  navigation,
  clicked,
  setClicked,
}: any): ReactElement => {
  const hook = usePasswordChange({navigation, clicked, setClicked})

  return (
    <View style={styles.container}>
      <BaseInput
        title={'settings.currentPassword'}
        image={Imgs.lock}
        onChangeText={hook.currentPassword.onChangeText}
        onSubmit={hook.currentPassword.onSubmit}
        ref={hook.currentPasswordRef}
        secure
      />

      <BaseInput
        title={'settings.newPassword'}
        image={Imgs.lock}
        onChangeText={hook.repetePassword.onChangeText}
        onSubmit={hook.repetePassword.onSubmit}
        ref={hook.repetePasswordRef}
        onFocus={hook.repetePassword.onFocus}
        secure
      />

      <BaseInput
        title={'settings.repetePassword'}
        image={Imgs.lock}
        onChangeText={hook.newPassword.onChangeText}
        onSubmit={hook.newPassword.onSubmit}
        onFocus={hook.newPassword.onFocus}
        ref={hook.newPasswordRef}
        secure
      />
    </View>
  )
}

export default PasswordChangeView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
