import {
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler'
import { SwipeDetails } from './types'

export const swipeDetails: SwipeDetails = {
  currentState: 0,
  x: 0,
  swipeLeftAction: null,
}

/**
 * Swipe action.
 */
export const swipeAction = ({ nativeEvent }: PanGestureHandlerStateChangeEvent) => {
  const {
    absoluteX,
    state,
  } = nativeEvent

  if (state === State.CANCELLED || state === State.FAILED || state === State.UNDETERMINED) {
    swipeDetails.currentState = State.UNDETERMINED
    swipeDetails.x = 0
  } else if (state === State.BEGAN && absoluteX <= 50) {
    swipeDetails.currentState = State.BEGAN
    swipeDetails.x = absoluteX
  } else if (state === State.ACTIVE && swipeDetails.currentState === State.BEGAN) {
    swipeDetails.currentState = State.ACTIVE
  } else if (state === State.END && swipeDetails.currentState === State.ACTIVE) {
    const dx = absoluteX - swipeDetails.x
    // console.group('Touch info')
    // console.log(`განვლილი მანძილი - ${dx}`)
    // console.log(`საწყისი x - ${swipeDetails.x}`)
    // console.log(`საბოლოო x - ${absoluteX}`)
    // console.groupEnd()

    if (dx > 150) {
      swipeDetails.swipeLeftAction && swipeDetails.swipeLeftAction()
    }

    swipeDetails.currentState = State.UNDETERMINED
    swipeDetails.x = 0
  }
}
