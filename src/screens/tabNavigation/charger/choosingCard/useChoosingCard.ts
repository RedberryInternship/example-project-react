import React, { useState, useRef, useContext } from 'react'
import { Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { useForm } from 'react-hook-form'
import { selectUser } from 'state/selectors'
import { Navigation } from 'allTypes'
import { startCharging } from 'hooks/actions/chargerActions'
import ChargerContext from 'hooks/contexts/charger'
import services from 'services'
import { refreshUserData } from 'state/actions/userActions'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'helpers/inform'

const animatedArrow = new Animated.Value(0)

// Vobi todo: move this in hooks
export default (navigation: Navigation) => {
  const state = useSelector(selectUser)
  const dispatch = useDispatch()

  const { dispatch: chargerDispatch } = useContext(ChargerContext)

  const { control, handleSubmit, errors } = useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const slideUpPanelRef: React.RefObject<SlidingUpPanel> = useRef(null)

  const { t } = useTranslation()

  const setActiveCard = async (id: number) => {
    try {
      await services.setDefaultCard(id)
      dispatch(refreshUserData())
    } catch (error) {
      remoteLogger(error)
      DisplayDropdownWithError()
    }
  }
  const submitHandler = async ({ amount }: { amount: number }) => {
    setLoading(true)
    startCharging(
      {
        type: navigation.getParam('type'),
        connectorTypeId: navigation.getParam('connectorTypeId'),
        amount,
        userCardId: state.user?.user_cards?.[0].id,
      },
      chargerDispatch,
      setLoading,
    )
  }

  return {
    t,
    setActiveCard,
    slideUpPanelRef,
    animatedArrow,
    control,
    handleSubmit,
    submitHandler,
    errors,
    loading,
    state,
  }
}
