import { useState, useEffect } from 'react'
import services from 'services'
import { CarMarkAndModelTypes, UserCar } from 'types'
import { UseAddCarProps } from './types'

const useAddCar = ({ register, setValue }: UseAddCarProps) => {
  const [data, setData] = useState<CarMarkAndModelTypes[]>([])
  const [userCars, setUserCars] = useState<UserCar[]>([])
  const [model, setModel] = useState<string>('')
  const [manufacturer, setManufacturer] = useState<string>('')
  const [selectedModels, setSelectedModels] = useState<string[]>([''])

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
      const { user_cars } = await services.getCars()
      setUserCars(user_cars)
    })()
  }, [register])

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
    setModel,
    userCars,
    selectedModels,
    setManufacturer,
  }
}

export default useAddCar
