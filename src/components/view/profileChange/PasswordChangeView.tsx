import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'

import {BaseInput, PasswordConfirmationView} from 'components'
import images from 'assets/images'
import {Controller} from 'react-hook-form'

type PasswordChangeViewProps = {
  errors: Record<string, any>
  watch: (name: string) => string
  control: any
}

const PasswordChangeView = ({
  errors,
  watch,
  control,
}: PasswordChangeViewProps): ReactElement => {
  return (
    <View style={styles.container}>
      <Controller
        as={BaseInput}
        name="currentPassword"
        rules={{
          minLength: {value: 8, message: 'dropDownAlert.editPassword.minSize'},
        }}
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        image={images.lock}
        secure={true}
        title={'settings.currentPassword'}
      />
      <PasswordConfirmationView
        errors={errors}
        watch={watch}
        control={control}
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
