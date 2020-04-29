import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'

import {ProfileFieldChange} from 'allTypes'

import {BaseInput} from 'components'
import images from '../../../assets/images'
import {Controller} from 'react-hook-form'

const AddCar = ({
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
        name={'manufacturer'} // TODO: name according endponit body property
        rules={{required: true, minLength: 3}}
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        title={'settings.manufacturer' ?? ''}
        image={images.addCarInput}
        defaultValue={value}
        errorText={errors?.[type] ? 'dropDownAlert.editFirstname.minSize' : ''}
      />
      <Controller
        as={BaseInput}
        name={'model'} // TODO: name according endponit body property
        rules={{required: true, minLength: 3}}
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        title={'settings.model' ?? ''}
        image={images.addCarInput}
        defaultValue={value}
        errorText={errors?.[type] ? 'dropDownAlert.editFirstname.minSize' : ''}
      />
    </View>
  )
}

export default AddCar

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
