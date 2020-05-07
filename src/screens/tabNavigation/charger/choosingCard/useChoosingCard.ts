import {useState, useRef, useContext} from 'react'
import {Animated} from 'react-native'
import {useTranslation} from 'react-i18next'
import SlidingUpPanel from 'rn-sliding-up-panel'
import {useForm} from 'react-hook-form'

import {Navigation, AppContextType, UserCard} from 'allTypes'
import {startCharging} from 'hooks/actions/chargerActions'
import {AppContext} from '../../../../../App'

const animatedArrow = new Animated.Value(0)

export default (navigation: Navigation) => {
  const {dispatch, state}: AppContextType = useContext(AppContext)
  const [cards, setCards] = useState<UserCard[]>(state.user?.user_cards ?? [])
  const {control, handleSubmit, errors} = useForm()

  const slideUpPanelRef: React.RefObject<SlidingUpPanel> = useRef(null)

  const {t} = useTranslation()

  const setActiveCard = (index: number) => {
    const activeCard = cards?.[index]
    cards?.splice(index, 1)
    setCards([activeCard, ...(cards ?? [])])
  }
  const submitHandler = async ({amount}: {amount: number}) => {
    startCharging(
      {
        type: navigation.getParam('type'),
        connectorTypeId: navigation.getParam('connectorTypeId'),
        amount,
        userCardId: cards?.[0].id,
      },
      dispatch,
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
    cards,
  }
}
