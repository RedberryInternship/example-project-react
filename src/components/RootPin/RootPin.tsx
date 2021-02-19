/* eslint-disable max-len */
import React from 'react'
import { Image } from 'react-native'
import { ChargerMarkerIcon } from 'types'
import { Pins, StrokedPins, BoldlyStrokedPins } from 'assets/images'
import { determineChargerPin } from './helper'

const RootPin = (
  {
    width = 40,
    height = 56,
    privateCharger,
    fastCharger,
    pinColorType,
  }: ChargerMarkerIcon,
) => {
  type PinsType = typeof BoldlyStrokedPins
  const pinName = determineChargerPin(privateCharger!!, fastCharger!!, pinColorType)
  // const pin = Pins[pinName]
  // const pin = StrokedPins[pinName]
  const pin = BoldlyStrokedPins[pinName as keyof PinsType]

  return (
    <Image
      source={pin}
      style={
        {
          width,
          height,
        }
      }
    />
  )
}

export default RootPin
