import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Controller } from 'react-hook-form'
import * as Const from 'utils/const'
import defaults from 'utils/defaults'
import colors from 'utils/colors'
import BaseInput from 'components/BaseInput'
import BaseText from 'components/BaseText'
import PasswordRulesLabel from 'components/PasswordRulesLabel'
import images from 'assets/images'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { PasswordViewFC } from 'screens/authentication/registration/types'

const PasswordView: PasswordViewFC = (
  {
    hook: {
      control,
      watch,
      setValue,
    },
  },
) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Controller
        as={BaseInput}
        name="password"
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        image={images.lock}
        imageStyle={{ tintColor: colors.primaryBlue }}
        testID="RegistrationPasswordInput"
        secure
        title="authentication.registration.password"
      />
      <PasswordRulesLabel />
      <Controller
        as={BaseInput}
        name="repeatPassword"
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        image={images.lock}
        imageStyle={{ tintColor: colors.primaryBlue }}
        returnKeyType="send"
        testID="RegistrationRepeatPasswordInput"
        secure
        title="authentication.registration.repeatPassword"
      />
      <View style={styles.termsContainer}>
        <TouchableOpacity
          onPress={() => setValue('termsAndConditions', !watch('termsAndConditions'))}
          style={styles.checkboxImageContainer}
          testID="AgreeTermsAndConditionsButton"
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
            defaults.modal?.current?.customUpdate(true, { type: 6 })
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
  ({ activePage }, { activePage: nextActivePage }) => nextActivePage !== 2 && activePage !== 2,
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
    color: colors.primaryGreyishWhite,
    marginLeft: 16,
    flex: 1,
    fontSize: 14,
  },
})
