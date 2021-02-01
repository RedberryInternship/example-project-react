import React from 'react'
import { View } from 'react-native'
import { Controller } from 'react-hook-form'
import colors from 'utils/colors'
import * as Const from 'utils/const'
import { InputValidation } from 'utils'
import BaseInput from 'components/BaseInput'
import images from 'assets/images'
import { UserInfoViewFC } from 'screens/authentication/registration/types'

const UserInfoView: UserInfoViewFC = ({ hook }) => {
  const { control, errors } = hook

  return (
    <View style={{ width: Const.Width, paddingHorizontal: 16 }}>
      <Controller
        as={BaseInput}
        name="name"
        rules={InputValidation.inputString}
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        image={images.user}
        imageStyle={{ tintColor: colors.primaryBlue }}
        returnKeyType="next"
        testID="nameInput"
        title="authentication.registration.name"
        required
        errorText={errors?.name ? 'dropDownAlert.registration.fillName' : ''}
      />
      <Controller
        as={BaseInput}
        name="surname"
        rules={InputValidation.inputString}
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        image={images.user}
        imageStyle={{ tintColor: colors.primaryBlue }}
        returnKeyType="next"
        title="authentication.registration.surname"
        errorText={
          errors?.surname ? 'dropDownAlert.registration.fillSurname' : ''
        }
        required
      />

      <Controller
        as={BaseInput}
        name="email"
        rules={{
          validate: InputValidation.emailValidation,
        }}
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        image={images.user}
        imageStyle={{ tintColor: colors.primaryBlue }}
        returnKeyType="go"
        title="authentication.registration.email"
        keyboardType="email-address"
        errorText={errors?.email ? errors?.email.message : ''}
      />
    </View>
  )
}

export default React.memo(
  UserInfoView,
  (
    {
      activePage,
    },
    {
      activePage: nextActivePage,
    },
  ) => activePage !== 1 && nextActivePage !== 1,
)
