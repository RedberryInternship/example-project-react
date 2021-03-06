import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ProfileFieldChange } from 'types'
import BaseInput from 'components/BaseInput'
import { Controller } from 'react-hook-form'
import images from 'assets/images'

const SingleInputView = (
  {
    inputName,
    validator,
    control,
    testID,
    errors,
    value,
    type,
  }: ProfileFieldChange,
) => {
  // eslint-disable-next-line no-nested-ternary
  const errorText = errors?.[type]
    ? errors?.[type].message !== ''
      ? errors?.[type].message
      : 'dropDownAlert.editFirstname.minSize'
    : ''

  let inputTestID = undefined;

  if (inputName === 'settings.firstname') {
    inputTestID = 'firstnameInput';
  }

  if (inputName === 'settings.lastname') {
    inputTestID = 'lastnameInput';
  }

  if (inputName === 'settings.mail') {
    inputTestID = 'emailInput';
  }

  return (
    <View style={styles.container}>
      <Controller
        as={BaseInput}
        name={type}
        rules={
          validator
            ? { required: true, validate: validator }
            : { required: true, minLength: 3 }
        }
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        title={inputName ?? ''}
        image={images.blueUser}
        defaultValue={value}
        errorText={errorText}
        testID={inputTestID}
      />
    </View>
  )
}

export default SingleInputView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
