import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from 'utils'
import { BaseText } from 'components'
import { CountDownFC } from './types'
import useCountDown from './useCountDown'

const CountDown: CountDownFC = (
  {
    penaltyEnabled,
    startTime,
    onFinish,
    alarm,
    popup,
  },
) => {
  const { time } = useCountDown(
    {
      penaltyEnabled,
      startTime,
      onFinish,
      alarm,
    },
  )
  const textStyle = {
    fontSize: popup ? 17 : 22,
    color: popup ? Colors.primaryBackground : Colors.primaryWhite,
  }

  return (
    <View style={styles.container}>
      <BaseText style={[styles.text, textStyle]}>{time}</BaseText>
    </View>
  )
}

export default CountDown

const styles = StyleSheet.create({
  container: {},
  text: {
    lineHeight: 36,
    letterSpacing: 0.41,
  },
})
