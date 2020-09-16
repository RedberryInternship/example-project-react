import React, {ReactElement} from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {Controller} from 'react-hook-form'

import {Colors, Const, InputValidationHelpers, Defaults} from 'utils'
import {BaseInput, BaseText} from 'components'
import images from 'assets/images'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useTranslation} from 'react-i18next'

type PasswordViewProps = {
  hook: Record<string, any>
  activePage: number
}
// eslint-disable-next-line react/display-name
const PasswordView = ({
  hook: {control, watch, setValue},
}: PasswordViewProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <Controller
        as={BaseInput}
        name="password"
        // rules={{
        //   validate: InputValidationHelpers.passwordConfirmValidation(
        //     repeatPassword,
        //   ),
        // }}
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
        // rules={{
        //   validate: InputValidationHelpers.passwordConfirmValidation(
        //     password,
        //   ),
        // }}
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        image={images.lock}
        imageStyle={{tintColor: Colors.primaryBlue}}
        returnKeyType={'send'}
        testID={'RepeatpasswordInput'}
        secure={true}
        title={'authentication.registration.repeatPassword'}
      />
      <View style={styles.termsContainer}>
        <TouchableOpacity
          onPress={() =>
            setValue('termsAndConditions', !watch('termsAndConditions'))
          }
          style={styles.checkboxImageContainer}
        >
          <Image
            source={
              watch('termsAndConditions') ? images.greenTick : images.circle
            }
            style={styles.checkBoxImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Defaults.modal.current?.customUpdate(true, {type: 6})
          }}
        >
          <BaseText style={styles.textField}>
            {t('drawer.termsAndConditions')}
          </BaseText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default React.memo(
  PasswordView,
  ({activePage}, {activePage: nextActivePage}) =>
    nextActivePage != 2 && activePage != 2,
)

const styles = StyleSheet.create({
  container: {
    width: Const.Width,
    paddingHorizontal: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  checkboxImageContainer: {
    alignItems: 'flex-end',
    alignSelf: 'center',
    width: 30,
    height: 30,
    justifyContent: 'center',
  },
  checkBoxImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  textField: {
    color: Colors.primaryGreyishWhite,
    marginLeft: 16,
    flex: 1,
    fontSize: 14,
  },
})
