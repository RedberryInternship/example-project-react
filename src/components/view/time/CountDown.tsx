import React, {useState, useEffect, ReactElement} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import moment from 'moment'

import {Colors} from 'utils'

enum Status {
  'finished',
  'started',
  'threeMinuteLefted', // Vobi Todo: use spell checker
}
type CountDown = {
  duration: number
  up: boolean
  alarm: boolean
  popup?: boolean
  onChange?: (status: Status) => void
}
const Interval = 1000

const CountDown = ({
  duration,
  up,
  alarm,
  onChange,
  popup,
}: CountDown): ReactElement => {
  const [time, setTime] = useState(``)

  const showDate = (): string => {
    return moment(duration)
      .utcOffset(0)
      .format(`${alarm ? '' : 'HH : '}mm : ss`)
      .toString()
  }

  useEffect(() => {
    setTime(showDate())

    const timeInterval = setInterval(() => {
      duration = moment
        .duration(duration + (up ? Interval : -Interval), 'milliseconds')
        .asMilliseconds()

      setTime(showDate())

      if (duration <= 0) {
        onChange && onChange(Status.finished)
        clearInterval(timeInterval)
        return
      }
    }, 1000)

    return (): void => {
      clearInterval(timeInterval)
    }
  }, [])

  // Vobi todo: in this cases you should consider using useMemo
  // Vobi todo: this recreates object every second
  const textStyle = {
    fontSize: popup ? 17 : 22,
    color: popup ? Colors.primaryBackground : Colors.primaryWhite,
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, textStyle]}>{time}</Text>
    </View>
  )
}

export default CountDown

const styles = StyleSheet.create({
  container: {},
  text: {
    lineHeight: 36,
    letterSpacing: -0.41,
  },
})
