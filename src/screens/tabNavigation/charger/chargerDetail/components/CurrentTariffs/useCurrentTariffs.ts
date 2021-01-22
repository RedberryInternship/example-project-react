import { useRef } from 'react'
import { Animated } from 'react-native'
import { ConnectorTypes } from 'types/enums'
import { CurrentTariffsProps } from './types'

let open = false

const useCurrentTariffs = ({ connector }: CurrentTariffsProps) => {
  const height = useRef(new Animated.Value(60)).current
  const rotation = useRef(new Animated.Value(0)).current

  const connectorCount = connector?.name !== ConnectorTypes.TYPE_2
    ? connector?.fast_charging_prices?.length
    : connector?.charging_prices?.length

  const openedTariffsHeight = connectorCount
    ? connectorCount * 45 + 73
    : 73

  const toggleTariffs = () => {
    const toHeight = open ? 60 : openedTariffsHeight
    const toRotate = open ? 0 : 180
    open = !open

    Animated.timing(height, {
      toValue: toHeight,
      duration: 500,
      useNativeDriver: false,
    }).start()

    Animated.timing(rotation, {
      toValue: toRotate,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }

  const rotateZ = rotation.interpolate(
    {
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    },
  )

  return {
    toggleTariffs,
    rotateZ,
    height,
  }
}

export default useCurrentTariffs
