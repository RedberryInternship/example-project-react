import {useState, useEffect} from 'react'
import {Animated} from 'react-native'

type MyAnimProps = {
  active: boolean
}

const useFaqListItem = ({active}: MyAnimProps) => {
  const [toggleAnswerAnim] = useState(new Animated.Value(0))

  useEffect(() => {
    let toValue = 0
    const duration = 16

    if (active) {
      toValue = 120
    }

    Animated.timing(toggleAnswerAnim, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: false,
    }).start()
  }, [active])

  const rotationValue = toggleAnswerAnim.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['180deg', '0deg', '0deg'],
  })

  const paddingMarginValue = toggleAnswerAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 16],
  })

  const onOrOff = toggleAnswerAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  })

  const opacity = toggleAnswerAnim.interpolate({
    inputRange: [0, 75, 100],
    outputRange: [0, 0, 1],
  })

  return {
    rotationValue,
    paddingMarginValue,
    onOrOff,
    opacity,
    toggleAnswerAnim,
  }
}

export default useFaqListItem
