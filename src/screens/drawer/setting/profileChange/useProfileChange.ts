import { useContext } from 'react'

import {
  Navigation,
  UserSettingEnum,
  AppContextType,
} from '../../../../../@types/allTypes.d'

import AppContext from 'hooks/contexts/app'
import { useForm } from 'react-hook-form'
import services from 'services'
import {
  DisplayDropdownWithError,
  DisplayDropdownWithSuccess,
} from 'helpers/inform'
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
    if (type === UserSettingEnum.phone) {
      updateUserInfo({ [type]: form.phone })
    } else if (type === UserSettingEnum.password) {
      updateUserPassword(form)
    } else if (type === UserSettingEnum.addCar) {
      updateCar(form)
    } else updateUserInfo(form)
  }

  const updateUserInfo = async (form: Record<string, string>) => {
    try {
      const result = await services.updateUserInfo({ [type]: form[type] })

      if (result.updated === true) {
        navigation.goBack()
        editUserInfo(dispatch, form[type], type)
        DisplayDropdownWithSuccess(
          'dropDownAlert.informationUpdatedSuccessfully',
        )
      } else {
        throw new Error('Something Went Wrong...')
      }
    } catch (err) {
      DisplayDropdownWithError()
    }
  }
  const updateCar = async (form: Record<string, string | number>) => {
    try {
      const result = await services.addCar(+form.carModelId)

      navigation.goBack()
      updateUser(dispatch)
      DisplayDropdownWithSuccess('dropDownAlert.informationUpdatedSuccessfully')
    } catch (err) {
      DisplayDropdownWithError()
    }
  }

  const updateUserPassword = async (form: Record<string, string>) => {
    //TODO: need outside component validation
    if (!form.repeatPassword && !form.password)
      return DisplayDropdownWithError(
        'dropDownAlert.forgotPassword.passwordsNotFilled',
      )
    else if (form.password && form.password.length < 8) {
      return DisplayDropdownWithError(
        'dropDownAlert.forgotPassword.newPasswordIncorrectLength',
      )
    } else if (form.password !== form.repeatPassword) {
      DisplayDropdownWithError('dropDownAlert.registration.passwordNotEqual')
      return 'passwordNotEqual' //return error true because we dont check password match from backend
    }
    try {
      const result = await services.editPassword(
        state?.user?.phone_number ?? '',
        form.currentPassword,
        form.password,
      )
      if (result.status_code === 200 || !result.status_code) {
        DisplayDropdownWithSuccess('dropDownAlert.editPassword.success')
        navigation.goBack()
      } else {
        throw new Error()
      }
    } catch (e) {
      if (e.status === 401) {
        DisplayDropdownWithError('dropDownAlert.editPassword.passwordNotValid')
      } else {
        DisplayDropdownWithError()
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
