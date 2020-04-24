import {useState, useRef, useContext} from 'react'
import {Animated} from 'react-native'
import {useTranslation} from 'react-i18next'
import SlidingUpPanel from 'rn-sliding-up-panel'
import {useForm} from 'react-hook-form'

import {Navigation} from 'allTypes'
import {startCharging} from 'hooks/actions/chargerActions'
import {AppContext} from '../../../../../App'

const defCard = [
  {lastDigits: '23232'},
  {lastDigits: '23234'},
  {lastDigits: '2567'},
]
const animatedArrow = new Animated.Value(0)

export default (navigation: Navigation) => {
  const {dispatch} = useContext(AppContext)
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0)
  const {control, handleSubmit, errors} = useForm()

  const slideUpPanelRef: React.RefObject<SlidingUpPanel> = useRef(null)

  const {t} = useTranslation()

  const setActiveCard = (index: number) => {
    setActiveCardIndex(index)
  }
  const submitHandler = async ({amount}: {amount: number}) => {
    startCharging(
      {
        type: navigation.getParam('type'),
        connectorTypeId: navigation.getParam('connectorTypeId'),
        amount,
      },
      dispatch,
    )
  }

  return {
    t,
    activeCardIndex,
    setActiveCard,
    slideUpPanelRef,
    defCard,
    animatedArrow,
    control,
    handleSubmit,
    submitHandler,
    errors,
  }
}
