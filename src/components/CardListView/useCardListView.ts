import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { refreshUserData } from 'state/actions/userActions'
import services from 'services'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'utils/inform'
import { useTranslation } from 'react-i18next'
import { onConfirm } from './helpers'

const useCardListView = () => {
  const [inUpdateMode, setInUpdateMode] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const toggleUpdateMode = useCallback(() => {
    setInUpdateMode(!inUpdateMode)
  }, [inUpdateMode])

  const setDefaultCreditCard = async (id: number) => {
    try {
      await services.setDefaultCard(id)
      dispatch(refreshUserData())
    } catch (error) {
      remoteLogger(error)
      DisplayDropdownWithError()
    }
  }

  const removeUserCreditCard = (id: number) => {
    onConfirm(async () => {
      try {
        await services.removeCard(id)
        dispatch(refreshUserData())
      } catch (error) {
        remoteLogger(error)
        DisplayDropdownWithError()
      }
    }, t)
  }

  return {
    removeUserCreditCard,
    setDefaultCreditCard,
    toggleUpdateMode,
    inUpdateMode,
  }
}

export default useCardListView
