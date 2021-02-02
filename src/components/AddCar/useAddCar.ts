import { useState, useEffect, useCallback } from 'react'
import services from 'services'
import { CarMarkAndModelTypes, UserCar } from 'types'
import {
  DisplayDropdownWithWarning,
  remoteLogger,
} from 'utils/inform'
import { UseAddCarProps } from './types'

const useAddCar = ({ register, setValue }: UseAddCarProps) => {
  const [data, setData] = useState<CarMarkAndModelTypes[]>([])
  const [userCars, setUserCars] = useState<UserCar[]>([])
  const [model, setModel] = useState<string>('')
  const [manufacturer, setManufacturer] = useState<string>('')
  const [selectedModels, setSelectedModels] = useState<string[]>([''])

  /**
   * Refresh user cars.
   */
  const refreshUserCars = useCallback(async () => {
    const { user_cars } = await services.getCars()
    setUserCars(user_cars)
  }, [])

  /**
   * Delete user car.
   */
  const deleteUserCar = useCallback(async (modelId: number) => {
    try {
      await services.removeCar(modelId)
      refreshUserCars()
    } catch (e) {
      remoteLogger(e)
    }
  }, [refreshUserCars])

  /**
   * Validate selecting the manufacturer first.
   */
  const notAllowedSelectingModelsWithoutManufacturers = useCallback(() => {
    if (manufacturer === '') {
      DisplayDropdownWithWarning('dropDownAlert.addCar.firstManufacturer')
    }
  }, [manufacturer])

  /**
   * onChange function for manufacturers.
   */
  const onManufacturerChange = useCallback((manufacturers: string[]) => {
    const newManufacturer = manufacturers?.[0] ?? ''
    setManufacturer(newManufacturer)
    setModel('')
    return newManufacturer
  }, [])

  /**
   * onChange function for models.
   */
  const onModelChange = useCallback((models: string[]): string => {
    const newModel = models?.[0] ?? ''
    setModel(newModel)
    return newModel
  }, [])

  useEffect(() => {
    (async () => {
      /**
       * Fetch all the car and mark lists.
       */
      const { data } = await services.getCarAndMarksList()
      setData(data)
      register('carModelId')

      /**
       * Fetch user cars data.
       */
      await refreshUserCars()
    })()
  }, [register, refreshUserCars])

  useEffect(() => {
    const models = data
      .find((val) => val.name === manufacturer)
      ?.models?.map((val) => val.name) ?? ['']

    models.length === 0 && models.push('')

    setSelectedModels(models)
  }, [manufacturer, setSelectedModels, data])

  useEffect(() => {
    const carModelId = data
      .find((val) => val.name === manufacturer)
      ?.models?.find((val) => val.name === model)?.id

    setValue(
      'carModelId',
      carModelId,
      true,
    )
  }, [model, manufacturer, setValue, data])

  useEffect(() => {
    setValue('model', '', true)
  }, [setValue])

  return {
    data,
    model,
    userCars,
    manufacturer,
    onModelChange,
    deleteUserCar,
    selectedModels,
    onManufacturerChange,
    notAllowedSelectingModelsWithoutManufacturers,
  }
}

export default useAddCar
