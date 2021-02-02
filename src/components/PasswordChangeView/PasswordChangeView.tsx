import React from 'react'
import { View, StyleSheet } from 'react-native'
import PasswordConfirmationView from 'components/PasswordConfirmationView'
import BaseInput from 'components/BaseInput'
import images from 'assets/images'
import { Controller } from 'react-hook-form'
import { PasswordChangeViewFC } from './types'

const PasswordChangeView: PasswordChangeViewFC = (
  {
    errors,
    watch,
    control,
  },
) => (
  <View style={styles.container}>
    <Controller
      as={BaseInput}
      name="currentPassword"
      rules={{
        minLength: { value: 8, message: 'dropDownAlert.editPassword.minSize' },
      }}
      control={control}
      onChange={(args) => args[0].nativeEvent.text}
      image={images.lock}
      secure
      title="settings.currentPassword"
    />
    <PasswordConfirmationView
      errors={errors}
      watch={watch}
      control={control}
    />
  </View>
)

export default PasswordChangeView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
