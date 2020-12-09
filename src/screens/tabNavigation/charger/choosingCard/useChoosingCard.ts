import { useState, useMemo } from 'react'
import { Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import { Navigation } from 'allTypes'
import { startChargingProcess } from 'state/actions/chargingProcessActions'
import services from 'services'
import { refreshUserData } from 'state/actions/userActions'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'helpers/inform'
import * as Const from 'utils/const'

const animatedArrow = new Animated.Value(0)

export default (navigation: Navigation) => {
  const state = useSelector(selectUser)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)

  /**
   * Set active card and also update database
   * this card to become default.
   */
  const setActiveCard = async (id: number) => {
    try {
      await services.setDefaultCard(id)
      dispatch(refreshUserData())
    } catch (error) {
      remoteLogger(error)
      DisplayDropdownWithError()
    }
  }

  /**
   * Start charging process.
   */
  const startChargingHandler = async ({ amount }: { amount: number }) => {
    setLoading(true)
    dispatch(
      startChargingProcess(
        {
          type: navigation.getParam('type'),
          connectorTypeId: navigation.getParam('connectorTypeId'),
          amount,
          userCardId: state.user?.user_cards?.[0].id,
        },
        setLoading,
      ),
    )
  }

  /**
   * Draggable range animation properties
   */
  const draggableRange = useMemo(
    () => ({
      bottom: Const.platformIOS ? 160 : 200,
      top:
        (Const.platformIOS ? 160 : 200)
        + ((state.user?.user_cards?.length ?? 0) + 1) * 50,
    }),
    [state],
  )

  /**
   * Slide up transformation animation properties.
   */
  const slidingUpTransformation = {
    transform: [
      {
        rotateX: animatedArrow.interpolate({
          inputRange: [draggableRange.bottom, draggableRange.top],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  }

  return {
    slidingUpTransformation,
    startChargingHandler,
    draggableRange,
    setActiveCard,
    animatedArrow,
    loading,
    state,
  }
}
