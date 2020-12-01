import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import services from 'services'
import {
  DisplayDropdownWithError,
  DisplayDropdownWithSuccess,
  remoteLogger,
} from 'helpers/inform'
import {
  refreshUserData,
  editUserInfo,
} from 'state/actions/userActions'
import {
  setUserData,
  setUserDetail,
} from 'helpers/user'
import { selectUser } from 'state/selectors'
import {
  UserSettingEnum,
  Navigation,
} from '../../../../../@types/allTypes.d'

export default (navigation: Navigation, type: UserSettingEnum) => {
  const dispatch = useDispatch();
  const state = useSelector(selectUser)

  const {
    triggerValidation,
    handleSubmit,
    getValues,
    setValue,
    register,
    control,
    errors,
    watch,
    reset,
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

        setUserDetail(type, form[type])
        setUserData()
        dispatch(editUserInfo(form[type], type))

        DisplayDropdownWithSuccess('dropDownAlert.informationUpdatedSuccessfully')
      } else {
        throw new Error('Something Went Wrong...')
      }
    } catch (err) {
      remoteLogger(err)
      DisplayDropdownWithError()
    }
  }
  const updateCar = async (form: Record<string, string | number>) => {
    try {
      await services.addCar(+form.carModelId)
      navigation.goBack()
      dispatch(refreshUserData())
      DisplayDropdownWithSuccess('dropDownAlert.informationUpdatedSuccessfully')
    } catch (err) {
      remoteLogger(err)
      DisplayDropdownWithError()
    }
  }

  const updateUserPassword = async (form: Record<string, string>) => {
    // TODO: need outside component validation
    if (!form.repeatPassword && !form.password) {
      return DisplayDropdownWithError('dropDownAlert.forgotPassword.passwordsNotFilled')
    }
    if (form.password && form.password.length < 8) {
      return DisplayDropdownWithError('dropDownAlert.forgotPassword.newPasswordIncorrectLength')
    } if (form.password !== form.repeatPassword) {
      DisplayDropdownWithError('dropDownAlert.registration.passwordNotEqual')
      return 'passwordNotEqual'
      // return error true because we dont check password match from backend
    }
    try {
      const result = await services
        .editPassword(state?.user?.phone_number ?? '', form.currentPassword, form.password)

      if (result.status_code === 200 || !result.status_code) {
        DisplayDropdownWithSuccess('dropDownAlert.editPassword.success')
        navigation.goBack()
      } else {
        throw new Error()
      }
    } catch (e) {
      remoteLogger(e)
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
