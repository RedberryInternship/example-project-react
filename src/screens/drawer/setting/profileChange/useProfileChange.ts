import { useContext } from 'react'

import {
  Navigation,
  UserSettingEnum,
  AppContextType,
} from '../../../../../@types/allTypes.d'

import { AppContext } from '../../../../../App'
import { useForm } from 'react-hook-form'
import services from 'services'
import { Helpers, Defaults } from 'utils'
import { editUserInfo, updateUser } from 'hooks/actions/rootActions'

export default (navigation: Navigation, type: UserSettingEnum) => {
  const { state, dispatch }: AppContextType = useContext(AppContext)
  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    errors,
    watch,
    reset,
    triggerValidation,
    control,
  } = useForm({
    validateCriteriaMode: 'all',
  })

  const submit = async (form: Record<string, string>) => {
    if (type === UserSettingEnum.phone) updateUserInfo({ [type]: form.phone })
    if (type === UserSettingEnum.password) updateUserPassword(form)
    if (type === UserSettingEnum.addCar) updateCar(form)
    else updateUserInfo(form)
  }

  const updateUserInfo = async (form: Record<string, string>) => {
    try {
      const result = await services.updateUserInfo({ [type]: form[type] })

      if (result.updated === true) {
        navigation.goBack()
        editUserInfo(dispatch, form[type], type)
        Helpers.DisplayDropdownWithSuccess(
          'dropDownAlert.informationUpdatedSuccessfully',
        )
      } else {
        throw new Error('Something Went Wrong...')
      }
    } catch (err) {
      Helpers.DisplayDropdownWithError()
    }
  }
  const updateCar = async (form: Record<string, string | number>) => {
    try {
      const result = await services.addCar(+form.carModelId)

      if (result.json_status === 'User Car Added') {
        navigation.goBack()
        updateUser(dispatch)
        Helpers.DisplayDropdownWithSuccess(
          'dropDownAlert.informationUpdatedSuccessfully',
        )
      } else {
        throw new Error('Something Went Wrong...')
      }
    } catch (err) {
      Helpers.DisplayDropdownWithError()
    }
  }

  const updateUserPassword = async (form: Record<string, string>) => {
    //TODO: need outside component validation
    if (!form.repeatPassword && !form.password)
      return Helpers.DisplayDropdownWithError(
        'dropDownAlert.forgotPassword.passwordsNotFilled',
      )
    else if (form.password && form.password.length < 8) {
      return Helpers.DisplayDropdownWithError(
        'dropDownAlert.forgotPassword.newPasswordIncorrectLength',
      )
    } else if (form.password !== form.repeatPassword) {
      return Helpers.DisplayDropdownWithError(
        'dropDownAlert.registration.passwordNotEqual',
      )
    }
    try {
      const result = await services.editPassword(
        state?.user?.phone_number ?? '',
        form.currentPassword,
        form.password,
      )
      if (result.status_code === 200) {
        Helpers.DisplayDropdownWithSuccess('dropDownAlert.editPassword.success')
        navigation.goBack()
      } else {
        throw new Error()
      }
    } catch (e) {
      if (e.status === 401) {
        Helpers.DisplayDropdownWithError(
          'dropDownAlert.editPassword.passwordNotValid',
        )
      } else {
        Helpers.DisplayDropdownWithError()
      }
      reset()
    }
  }

  return {
    state,
    dispatch,
    setValue,
    getValues,
    register,
    handleSubmit,
    errors,
    watch,
    reset,
    triggerValidation,
    control,
    submit,
  }
}
