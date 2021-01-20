import React from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { SwipeFC } from './types'
import { swipeAction, swipeDetails } from './helpers'

const Swipe: SwipeFC = ({ children, left }) => {
  swipeDetails.swipeLeftAction = left

  return (
    <PanGestureHandler onHandlerStateChange={swipeAction}>
      {children}
    </PanGestureHandler>
  )
}

export default Swipe
