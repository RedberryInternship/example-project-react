import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors, Const} from 'utils'
import {BaseInput} from 'components'
import Imgs from '../../../../assets/images'

const PasswordView = ({_this, hook}: any): ReactElement => {
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
        image={Imgs.lock}
        imageStyle={{tintColor: Colors.primaryBlue}}
        keyboardType={'email-address'}
        onChangeText={passwordTextHandler}
        onSubmit={passwordInputSubmit}
        secure={true}
        testID={'nameInput'}
        title={'authentication.registration.password'}
        returnKeyType={'next'}
        ref={hook.password}
      />
      <BaseInput
        image={Imgs.lock}
        imageStyle={{tintColor: Colors.primaryBlue}}
        keyboardType={'email-address'}
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
