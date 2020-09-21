import { useState, useRef, useContext } from 'react'
import { Animated } from 'react-native'
import { useTranslation } from 'react-i18next'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { useForm } from 'react-hook-form'

import { Navigation, AppContextType } from 'allTypes'
import { startCharging } from 'hooks/actions/chargerActions'
import AppContext from 'hooks/contexts/app'
import ChargerContext from 'hooks/contexts/charger'
import services from 'services'
import { updateUser } from 'hooks/actions/rootActions'
import { Helpers } from 'utils'

const animatedArrow = new Animated.Value(0)

export default (navigation: Navigation) => {
  const { state, dispatch }: AppContextType = useContext(AppContext)

  const { dispatch: chargerDispatch } = useContext(ChargerContext)

  const { control, handleSubmit, errors } = useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const slideUpPanelRef: React.RefObject<SlidingUpPanel> = useRef(null)

  const { t } = useTranslation()

  const setActiveCard = async (id: number) => {
    try {
      await services.setDefaultCard(id)
      updateUser(dispatch)
    } catch (error) {
      Helpers.DisplayDropdownWithError()
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
