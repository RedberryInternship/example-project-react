import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'

import {ProfileFieldChange} from 'allTypes'

import {BaseInput} from 'components'
import images from '../../../assets/images'
import {Controller} from 'react-hook-form'

const SingleInputView = ({
  value,
  errors,
  control,
  type,
  inputName,
}: ProfileFieldChange): ReactElement => {
  return (
    <View style={styles.container}>
      <Controller
        as={BaseInput}
        name={type}
        rules={{required: true, minLength: 3}}
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        title={inputName ?? ''}
        image={images.blueUser}
        defaultValue={value}
        errorText={errors?.[type] ? 'dropDownAlert.editFirstname.minSize' : ''}
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
