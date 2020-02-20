import {useState, useRef} from 'react'
import {Alert, TextInput, Animated} from 'react-native'
import {useTranslation} from 'react-i18next'
import SlidingUpPanel from 'rn-sliding-up-panel'

type _This = {
  enteredPrice: string
  animatedArrow: Animated.Value
}

const defCard = [
  {lastDigits: '23232', active: true},
  {lastDigits: '23234', active: false},
  {lastDigits: '2567', active: false},
]

export default () => {
  const [loading, SetLoading] = useState<boolean>(true)
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0)

  const _this: React.RefObject<_This> = useRef({
    enteredPrice: 'asd',
    animatedArrow: new Animated.Value(0),
  })
  const _panel: React.RefObject<SlidingUpPanel> = useRef(null)

  const enterPriceRef: React.RefObject<TextInput> = useRef(null)

  const {t} = useTranslation()

  const enterPriceHandler = (val: string) => {
    enterPriceRef.current?.setNativeProps({
      text: val,
    })
    _this.current!.enteredPrice = val
    // Ajax.get()
  }

  const enterPriceSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }

  const setActiveCard = (index: number) => {
    defCard[index].active = true
    defCard[activeCardIndex].active = false

    setActiveCardIndex(index)
  }

  return {
    loading,
    SetLoading,
    enterPriceHandler,
    enterPriceSubmit,
    _this,
    t,
    enterPriceRef,
    activeCardIndex,
    setActiveCard,
    _panel,
    defCard,
  }
}
