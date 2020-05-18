import React, {
  useState,
  useEffect,
  ReactElement,
  useCallback,
  useRef,
} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import moment from 'moment'

import {Colors} from 'utils'

enum Status {
  'finished',
  'started',
  'threeMinuteLefted', // Vobi Todo: use spell checker
}
type CountDownProps = {
  startTime?: string
  alarm: boolean
  popup?: boolean
  onFinish?: () => void
  up?: boolean
}
const INTERVAL = 1000

const CountDown = ({
  startTime,
  onFinish,
  alarm,
  popup,
  up,
}: CountDownProps): ReactElement => {
  const [time, setTime] = useState('')
  const ref: any = useRef(null)

  useEffect(() => {
    if (ref.current) clearTimeout(ref.current)

    ref.current = setTimeout(countUp.bind(CountDown), INTERVAL)

    return (): void => {
      clearTimeout(ref.current)
    }
  }, [startTime, time, alarm])

  const countUp = () => {
    if (!startTime)
      return setTime((prevState) =>
        prevState.length !== 3 ? prevState + '.' : '.',
      )
    const diff = moment().valueOf() - parseInt(startTime)
    const momentDiff = moment.duration(Math.abs(diff))

    if (alarm && diff > 0) {
      onFinish && onFinish()
      return
    }

    console.log(moment().valueOf(), momentDiff, startTime, 'diff.seconds')

    const hour = momentDiff.hours() ? pad(momentDiff.hours()) + ':' : ''
    const countdownString = `${hour}${pad(momentDiff.minutes())}:${pad(
      momentDiff.seconds(),
    )}`
    // console.log(startTime, countdownString, diff, time, 'fstartTime')

    setTime(countdownString)
  }

  const countDown = () => {}

  const pad = (val: number) => {
    const valString = val + ''
    if (valString.length < 2) {
      return '0' + valString
    } else {
      return valString
    }
  }

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
    letterSpacing: 0.41,
  },
})
