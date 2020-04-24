/* eslint-disable no-unused-vars */
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'

type InputValues = {
  name: string
  surname: string
  email: string | undefined
}

export default (setActivePage: any) => {
  const {control, handleSubmit, getValues, errors, triggerValidation} = useForm(
    {
      validateCriteriaMode: 'all',
      submitFocusError: true,
    },
  )

  const buttonClickHandler = async ({
    name,
    surname,
    email,
  }: InputValues): Promise<void> => {
    setActivePage(2)
  }

  return {
    buttonClickHandler,
    handleSubmit,
    control,
    getValues,
    errors,
    triggerValidation,
  }
}
