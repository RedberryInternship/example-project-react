import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { ProfileFieldChange } from 'types'
import { BaseText, CarListItem, Select } from 'components'
import { Controller } from 'react-hook-form'
import images from 'assets/images'
import useAddCar from './useAddCar'
import { onConfirm } from './helpers'

const AddCar = (
  {
    register,
    setValue,
    control,
    watch,
  }: ProfileFieldChange,
) => {
  const {
    data,
    model,
    userCars,
    manufacturer,
    onModelChange,
    deleteUserCar,
    selectedModels,
    onManufacturerChange,
    notAllowedSelectingModelsWithoutManufacturers,
  } = useAddCar(
    {
      register,
      setValue,
      watch,
    },
  )
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <>
        <Controller
          as={Select}
          name="manufacturer"
          rules={{ required: true }}
          control={control}
          onChange={onManufacturerChange}
          title={'settings.manufacturer' ?? ''}
          image={images.addCarInput}
          dropdownIcon={images.caretDown}
          data={data.map((val) => val.name)}
          selectedValue={manufacturer}
          value=""
        />
        <View style={styles.divider}>
          <Controller
            as={Select}
            name="model"
            rules={{ required: true }}
            control={control}
            onChange={onModelChange}
            title={'settings.model' ?? ''}
            image={images.addCarInput}
            dropdownIcon={images.caretDown}
            data={selectedModels}
            selectedValue={model}
            value=""
            disabled={manufacturer === ''}
            onPress={notAllowedSelectingModelsWithoutManufacturers}
          />
        </View>
      </>

      <View style={styles.addedCars}>
        <BaseText>{t('addCar.addedCars')}</BaseText>
        <View style={styles.userCarsContainer}>
          {userCars.map((el) => (
            <CarListItem
              key={el.user_car.model_id}
              data={el}
              onDeletePress={() => {
                onConfirm(() => { deleteUserCar(el.user_car.model_id) }, t)
              }}
            />
          ))}
        </View>
      </View>

    </View>
  )
}

export default AddCar

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: 15,
    paddingTop: 80,
  },
  userCarsContainer: {
    flex: 1,
    marginTop: 20,
  },
  divider: {
    marginTop: 20,
  },
  addedCars: {
    marginTop: 40,
  },
})
