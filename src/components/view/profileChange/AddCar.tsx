import React, {ReactElement, useState, useEffect} from 'react'
import {View, StyleSheet, Alert, KeyboardAvoidingView} from 'react-native'

import {ProfileFieldChange, CarMarkAndModelTypes} from 'allTypes'

import {BaseInput, AutoCompleteDropdown} from 'components'
import images from '../../../assets/images'
import {Controller} from 'react-hook-form'
import {Const} from 'utils'
import services from 'services'

const AddCar = ({
  value,
  errors,
  control,
  type,
  inputName,
  register,
  getValues,
  watch,
  setValue,
}: ProfileFieldChange): ReactElement => {
  const [data, setData] = useState<CarMarkAndModelTypes[]>([])
  useEffect(() => {
    services.getCarAndMarksList().then(({data}) => setData(data))
    register('car_model_id')
  }, [])

  useEffect(() => {
    setValue(
      'car_model_id',
      data
        .find((val) => val.name == watch('manufacturer'))
        ?.models?.find((val) => val.name == watch('model')),
      true,
    )
    console.log(
      data
        .find((val) => val.name == watch('manufacturer'))
        ?.models?.find((val) => val.name == watch('model')),
      'car_model_id',
    )
  }, [watch('model')])

  console.log('====================================')
  console.log(
    watch('manufacturer'),
    data.find((val) => val.name == watch('manufacturer')),
    'data',
  )
  console.log('====================================')
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Controller
          as={AutoCompleteDropdown}
          name={'manufacturer'}
          rules={{required: true, minLength: 3}}
          control={control}
          onChange={(text) => {
            return text
          }}
          title={'settings.model' ?? ''}
          image={images.addCarInput}
          // defaultValue={value}
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
            rules={{required: true, minLength: 3}}
            control={control}
            onChange={(text) => {
              return text
            }}
            title={'settings.manufacturer' ?? ''}
            image={images.addCarInput}
            // defaultValue={value}
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

        <View style={{height: 164, zIndex: -1}} />
      </KeyboardAvoidingView>
    </View>
  )
}

export default AddCar

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
    // height: Const.Height / 1.6,
  },
})
