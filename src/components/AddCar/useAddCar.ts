import { useState, useEffect } from 'react'
import services from 'services'
import { CarMarkAndModelTypes } from 'types'
import { UseAddCarProps } from './types'

const useAddCar = ({ register, setValue, watch }: UseAddCarProps) => {
  const [data, setData] = useState<CarMarkAndModelTypes[]>([])
  useEffect(() => {
    services.getCarAndMarksList().then(({ data }) => setData(data))
    register('carModelId')
  }, [])

  useEffect(() => {
    setValue(
      'carModelId',
      data
        .find((val) => val.name === watch('manufacturer'))
        ?.models?.find((val) => val.name === watch('model'))?.id,
      true,
    )
  }, [watch('model')])

  useEffect(() => {
    setValue('model', '', true)
  }, [watch('manufacturer')])

  return {
    data,
  }
}

export default useAddCar
