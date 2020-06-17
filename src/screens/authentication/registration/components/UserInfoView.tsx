import React, {ReactElement} from 'react'
import {View} from 'react-native'
import {Controller} from 'react-hook-form'

import {Colors, Const, InputValidationHelpers} from 'utils'
import {BaseInput} from 'components'
import images from 'assets/images'

type UserInfoViewProps = {
  hook: Record<string, any>
  activePage: number
}
// eslint-disable-next-line react/display-name
const UserInfoView = React.memo(
  ({hook}: UserInfoViewProps): ReactElement => {
    const {control, errors} = hook

    return (
      <View style={{width: Const.Width, paddingHorizontal: 16}}>
        <Controller
          as={BaseInput}
          name="name"
          rules={InputValidationHelpers.inputString}
          control={control}
          onChange={(args) => args[0].nativeEvent.text}
          image={images.user}
          imageStyle={{tintColor: Colors.primaryBlue}}
          returnKeyType={'next'}
          testID={'nameInput'}
          title={'authentication.registration.name'}
          required={true}
          errorText={errors?.name ? 'dropDownAlert.registration.fillName' : ''}
        />
        <Controller
          as={BaseInput}
          name="surname"
          rules={InputValidationHelpers.inputString}
          control={control}
          onChange={(args) => args[0].nativeEvent.text}
          image={images.user}
          imageStyle={{tintColor: Colors.primaryBlue}}
          returnKeyType={'next'}
          title={'authentication.registration.surname'}
          errorText={
            errors?.surname ? 'dropDownAlert.registration.fillSurname' : ''
          }
          required={true}
        />

        <Controller
          as={BaseInput}
          name="email"
          rules={{
            validate: InputValidationHelpers.emailValidation,
          }}
          control={control}
          onChange={(args) => args[0].nativeEvent.text}
          image={images.user}
          imageStyle={{tintColor: Colors.primaryBlue}}
          returnKeyType={'go'}
          title={'authentication.registration.email'}
          keyboardType={'email-address'}
          errorText={errors?.email ? errors?.email.message : ''}
        />
      </View>
    )
  },
  ({activePage}, {activePage: nextActivePage}) =>
    activePage !== 1 && nextActivePage !== 1,
)

export default UserInfoView
