import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'
import {Controller} from 'react-hook-form'

import {Colors, Const, InputValidationHelpers} from 'utils'
import {BaseInput} from 'components'
import images from 'assets/images'

type PasswordViewProps = {
  hook: Record<string, any>
  activePage: number
}
// eslint-disable-next-line react/display-name
const PasswordView = React.memo(
  ({hook: {control, watch}}: PasswordViewProps): ReactElement => {
    return (
      <View style={styles.container}>
        <Controller
          as={BaseInput}
          name="password"
          rules={{
            validate: InputValidationHelpers.passwordConfirmValidation(
              watch('repeatPassword'),
            ),
          }}
          control={control}
          onChange={(args) => args[0].nativeEvent.text}
          image={images.lock}
          imageStyle={{tintColor: Colors.primaryBlue}}
          testID={'passwordInput'}
          secure={true}
          title={'authentication.registration.password'}
        />
        <Controller
          as={BaseInput}
          name="repeatPassword"
          rules={{
            validate: InputValidationHelpers.passwordConfirmValidation(
              watch('password'),
            ),
          }}
          control={control}
          onChange={(args) => args[0].nativeEvent.text}
          image={images.lock}
          imageStyle={{tintColor: Colors.primaryBlue}}
          returnKeyType={'send'}
          testID={'RepeatpasswordInput'}
          secure={true}
          title={'authentication.registration.repeatPassword'}
        />
      </View>
    )
  },
  ({activePage}, {activePage: nextActivePage}) =>
    nextActivePage != 2 && activePage != 2,
)

export default PasswordView

const styles = StyleSheet.create({
  container: {
    width: Const.Width,
    paddingHorizontal: 16,
  },
})
