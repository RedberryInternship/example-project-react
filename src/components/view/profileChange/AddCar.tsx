import React, { ReactElement, useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Keyboard,
} from 'react-native'

import { ProfileFieldChange, CarMarkAndModelTypes } from 'allTypes'
import AutoCompleteDropdown from 'components/item/AutoCompleteDropdown'
import images from '../../../assets/images'
import { Controller } from 'react-hook-form'
import services from 'services'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const AddCar = ({
  errors,
  control,
  type,
  register,
  watch,
  setValue,
}: ProfileFieldChange): ReactElement => {
  const [data, setData] = useState<CarMarkAndModelTypes[]>([])
  useEffect(() => {
    services.getCarAndMarksList().then(({ data }) => setData(data))
    register('carModelId')
  }, [])

  useEffect(() => {
    setValue(
      'carModelId',
      data
        .find((val) => val.name == watch('manufacturer'))
        ?.models?.find((val) => val.name == watch('model'))?.id,
      true,
    )
  }, [watch('model')])

  useEffect(() => {
    setValue('model', '', true)
  }, [watch('manufacturer')])

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <Controller
            as={AutoCompleteDropdown}
            name={'manufacturer'}
            rules={{ required: true, minLength: 3 }}
            control={control}
            onChange={(text) => {
              return text
            }}
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
              name={'model'}
              rules={{ required: true, minLength: 3 }}
              control={control}
              onChange={(text) => {
                return text
              }}
              title={'settings.manufacturer' ?? ''}
              image={images.addCarInput}
              dropdownIcon={images.caretDown}
              data={
                data
                  .find((val) => val.name == watch('manufacturer'))
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
