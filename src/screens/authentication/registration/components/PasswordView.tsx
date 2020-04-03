import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'

import {Colors, Const} from 'utils'
import {BaseInput} from 'components'
import images from 'assets/images'

const PasswordView = ({_this, hook}: any): ReactElement => {
  // Vobi Todo: destructure hook from top and pass functions to component
  // Vobi Todo: do not use _this use state in this case you need form library
  const passwordTextHandler = (text: string): void => {
    _this.current.password = text
  }
  const passwordInputSubmit = (): void => {
    hook.confirmedPassword.current.focus()
  }

  const repeatPasswordTextHandler = (text: string): void => {
    _this.current.confirmedPassword = text
  }
  const repeatPasswordInputSubmit = (): void => {
    hook.buttonClickHandler()
  }

  return (
    <View style={styles.container}>
      <BaseInput
        image={images.lock}
        imageStyle={{tintColor: Colors.primaryBlue}}
        onChangeText={passwordTextHandler}
        onSubmit={passwordInputSubmit}
        secure={true}
        testID={'nameInput'}
        title={'authentication.registration.password'}
        returnKeyType={'next'}
        ref={hook.password}
      />
      <BaseInput
        image={images.lock}
        imageStyle={{tintColor: Colors.primaryBlue}}
        onChangeText={repeatPasswordTextHandler}
        onSubmit={repeatPasswordInputSubmit}
        testID={'nameInput'}
        secure={true}
        title={'authentication.registration.repeatPassword'}
        returnKeyType={'send'}
        ref={hook.confirmedPassword}
      />
    </View>
  )
}

export default PasswordView

const styles = StyleSheet.create({
  container: {
    width: Const.Width,
    paddingHorizontal: 16,
  },
})
