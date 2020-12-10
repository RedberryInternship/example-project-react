import React from 'react'
import {
  View,
  StyleSheet,
  Keyboard,
} from 'react-native'

import { ProfileFieldChange } from 'types'
import { AutoCompleteDropdown } from 'components'
import { Controller } from 'react-hook-form'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import images from 'assets/images'
import useAddCar from './useAddCar'

const AddCar = (
  {
    errors,
    control,
    type,
    register,
    watch,
    setValue,
  }: ProfileFieldChange,
) => {
  const { data } = useAddCar(
    {
      register,
      setValue,
      watch,
    },
  )
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <Controller
            as={AutoCompleteDropdown}
            name="manufacturer"
            rules={{ required: true, minLength: 3 }}
            control={control}
            onChange={(text) => text}
            title={'settings.model' ?? ''}
            image={images.addCarInput}
            dropdownIcon={images.caretDown}
            data={[...data.map((val) => val.name)]}
            errorText={
              errors?.[type] ? 'dropDownAlert.editFirstname.minSize' : ''
            }
            zIndex={20}
          />
          <View>
            <Controller
              as={AutoCompleteDropdown}
              name="model"
              rules={{ required: true, minLength: 3 }}
              control={control}
              onChange={(text) => text}
              title={'settings.manufacturer' ?? ''}
              image={images.addCarInput}
              dropdownIcon={images.caretDown}
              data={
                data
                  .find((val) => val.name === watch('manufacturer'))
                  ?.models?.map((val) => val.name) ?? []
              }
              errorText={
                errors?.[type] ? 'dropDownAlert.editFirstname.minSize' : ''
              }
              zIndex={12}
            />
          </View>

          <View style={{ height: 164, zIndex: -1 }} />
        </>
      </TouchableWithoutFeedback>
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
