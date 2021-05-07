import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { ProfileFieldChange } from 'types'
import BaseText from 'components/BaseText'
import CarListItem from 'components/CarListItem'
import SelectCar from 'components/SelectCar'
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
          as={SelectCar}
          name="manufacturer"
          rules={{ required: true }}
          control={control}
          onChange={onManufacturerChange}
          title={'settings.manufacturer' || ''}
          image={images.addCarInput}
          dropdownIcon={images.caretDown}
          data={data.map((val) => val.name)}
          selectedValue={manufacturer}
          testID="manufacturerSelect"
          value=""
        />
        <View style={styles.divider}>
          <Controller
            onPress={notAllowedSelectingModelsWithoutManufacturers}
            dropdownIcon={images.caretDown}
            title={'settings.model' || ''}
            disabled={manufacturer === ''}
            rules={{ required: true }}
            image={images.addCarInput}
            onChange={onModelChange}
            data={selectedModels}
            selectedValue={model}
            testID="modelSelect"
            control={control}
            as={SelectCar}
            name="model"
            value=""
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
